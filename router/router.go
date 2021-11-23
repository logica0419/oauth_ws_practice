package router

import (
	"context"
	"fmt"
	"net/http"

	"github.com/gorilla/sessions"
	"github.com/hackathon-21winter-05/oauth_ws_practice/config"
	"github.com/labstack/echo-contrib/session"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"github.com/labstack/gommon/log"
	traq "github.com/sapphi-red/go-traq"
)

const (
	oauthCodeRedirect  = "/https://q.trap.jp/api/v3/oauth2/authorize"
	oauthTokenRedirect = "/https://q.trap.jp/api/v3/oauth2/token"
)

type Router struct {
	conf *config.Config
	cli  *traq.APIClient
	e    *echo.Echo
}

type Redirect struct {
	URI string `json:"dist"`
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

	r.addOauthRoutes(api)

	return r
}

func (r *Router) Start() {
	r.e.Logger.Panic(r.e.Start(":7070"))
}

func (r *Router) addOauthRoutes(group *echo.Group) {
	group.GET("/me", r.getMeHandler)
}

func (r *Router) getMeHandler(c echo.Context) error {
	sess, _ := session.Get("session", c)

	accessToken := sess.Values[traq.ContextAccessToken]
	if accessToken == nil {
		return c.JSON(http.StatusSeeOther, Redirect{URI: oauthCodeRedirect})
	}

	auth := context.WithValue(context.Background(), traq.ContextAccessToken, accessToken)

	v, res, err := r.cli.MeApi.GetMe(auth)
	if err != nil || res.StatusCode != http.StatusOK {
		return c.JSON(http.StatusSeeOther, Redirect{URI: fmt.Sprintf("%s?response_type=code&client_id=%s", oauthCodeRedirect, r.conf.ClientID)})
	}

	return c.JSON(http.StatusOK, v)
}