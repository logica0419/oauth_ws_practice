package router

import (
	"context"
	"crypto/sha256"
	"encoding/base64"
	"fmt"
	"net/http"
	"time"

	"github.com/antihax/optional"
	"github.com/gorilla/sessions"
	"github.com/hackathon-21winter-05/oauth_ws_practice/config"
	"github.com/labstack/echo-contrib/session"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"github.com/labstack/gommon/log"
	traq "github.com/sapphi-red/go-traq"
	"github.com/thanhpk/randstr"
)

const oauthCodeRedirect = "https://q.trap.jp/api/v3/oauth2/authorize"

type Router struct {
	conf *config.Config
	cli  *traq.APIClient
	e    *echo.Echo
}

type Redirect struct {
	URI string `json:"uri"`
}

func SetupRouter(conf *config.Config) *Router {
	client := traq.NewAPIClient(traq.NewConfiguration())

	e := echo.New()
	e.Logger.SetLevel(log.DEBUG)
	e.Logger.SetHeader("${time_rfc3339} ${prefix} ${short_file} ${line} |")
	e.Use(middleware.LoggerWithConfig(middleware.LoggerConfig{Format: "${time_rfc3339} method = ${method} | uri = ${uri} | status = ${status} ${error}\n"}))

	e.Use(session.Middleware(sessions.NewCookieStore([]byte("secret"))))

	r := &Router{
		conf: conf,
		cli:  client,
		e:    e,
	}

	api := r.e.Group("/api")
	api.GET("/ping", func(c echo.Context) error {
		return c.String(http.StatusOK, "pong")
	})
	api.GET("/icon", r.getIconHandler)

	r.addOauthRoutes(api)

	return r
}

func (r *Router) Start() {
	r.e.Logger.Panic(r.e.Start(":7070"))
}

func (r *Router) getIconHandler(c echo.Context) error {
	sess, _ := session.Get("session", c)

	accessToken := sess.Values["accessToken"].(string)
	auth := context.WithValue(context.Background(), traq.ContextAccessToken, accessToken)

	v, res, err := r.cli.MeApi.GetMyIcon(auth)
	if err != nil || res.StatusCode != http.StatusOK {
		return c.String(http.StatusBadRequest, err.Error())
	}

	http.ServeContent(c.Response(), c.Request(), "icon.png", time.Now(), v)
	return nil
}

func (r *Router) addOauthRoutes(group *echo.Group) {
	group.GET("/me", r.getMeHandler)
	group.POST("/code", r.postOAuthCodeHandler)
}

func (r *Router) getMeHandler(c echo.Context) error {
	sess, _ := session.Get("session", c)

	accessToken := sess.Values["accessToken"]
	auth := context.WithValue(context.Background(), traq.ContextAccessToken, accessToken)

	v, res, err := r.cli.MeApi.GetMe(auth)
	if err != nil || res.StatusCode != http.StatusOK {
		goto redirect
	}

	return c.JSON(http.StatusOK, v)

redirect:
	verifier := randstr.String(64)
	hash := sha256.Sum256([]byte(verifier))
	challenge := base64.RawURLEncoding.EncodeToString(hash[:])

	sess.Values["verifier"] = verifier
	sess.Options = &sessions.Options{
		Path:     "/",
		MaxAge:   86400 * 7,
		HttpOnly: true,
	}
	err = sess.Save(c.Request(), c.Response())
	if err != nil {
		return c.String(http.StatusInternalServerError, err.Error())
	}

	return c.JSON(http.StatusSeeOther, Redirect{
		URI: fmt.Sprintf("%s?response_type=code&client_id=%s&code_challenge=%s&code_challenge_method=S256", oauthCodeRedirect, r.conf.Client_ID, challenge),
	})
}

func (r *Router) postOAuthCodeHandler(c echo.Context) error {
	sess, _ := session.Get("session", c)
	var code = &struct {
		Code string `json:"code"`
	}{}

	if err := c.Bind(code); err != nil {
		return c.JSON(http.StatusBadRequest, err)
	}

	verifier := sess.Values["verifier"].(string)
	opts := &traq.Oauth2ApiPostOAuth2TokenOpts{Code: optional.NewString(code.Code), ClientId: optional.NewString(r.conf.Client_ID), CodeVerifier: optional.NewString(verifier)}
	token, res, err := r.cli.Oauth2Api.PostOAuth2Token(context.Background(), "authorization_code", opts)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err)
	}
	if token.AccessToken == "" || res.StatusCode >= 400 {
		return c.String(http.StatusInternalServerError, "failed to get access token")
	}

	sess.Values["accessToken"] = token.AccessToken
	sess.Options = &sessions.Options{
		Path:     "/",
		MaxAge:   86400 * 7,
		HttpOnly: true,
	}
	err = sess.Save(c.Request(), c.Response())
	if err != nil {
		return c.String(http.StatusInternalServerError, err.Error())
	}

	return c.NoContent(http.StatusOK)
}
