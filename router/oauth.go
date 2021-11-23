package router

import (
	"context"
	"crypto/sha256"
	"encoding/base64"
	"fmt"
	"net/http"

	"github.com/antihax/optional"
	"github.com/gorilla/sessions"
	"github.com/labstack/echo-contrib/session"
	"github.com/labstack/echo/v4"
	traq "github.com/sapphi-red/go-traq"
	"github.com/thanhpk/randstr"
)

func (r *Router) meRedirectHandler(c echo.Context, sess *sessions.Session) error {
	verifier := randstr.String(64)
	hash := sha256.Sum256([]byte(verifier))
	challenge := base64.RawURLEncoding.EncodeToString(hash[:])

	sess.Values["verifier"] = verifier
	sess.Options = &sessions.Options{
		Path:     "/",
		MaxAge:   86400 * 7,
		HttpOnly: true,
	}
	err := sess.Save(c.Request(), c.Response())
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
