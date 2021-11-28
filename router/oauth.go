package router

import (
	"context"
	"crypto/sha256"
	"encoding/base64"
	"fmt"
	"net/http"

	"github.com/antihax/optional"
	"github.com/gorilla/sessions"
	"github.com/hackathon-21winter-05/oauth_ws_practice/model/pb/rest"
	"github.com/hackathon-21winter-05/oauth_ws_practice/router/util"
	"github.com/labstack/echo-contrib/session"
	"github.com/labstack/echo/v4"
	traq "github.com/sapphi-red/go-traq"
	"github.com/thanhpk/randstr"
)

const oauthCodeRedirect = "https://q.trap.jp/api/v3/oauth2/authorize"

func (r *Router) getRedirectHandler(c echo.Context) error {
	sess, _ := session.Get("session", c)

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

	uri := fmt.Sprintf("%s?response_type=code&client_id=%s&code_challenge=%s&code_challenge_method=S256", oauthCodeRedirect, r.conf.Client_ID, challenge)
	redirectData := &rest.GetRedirectResponse{
		RedirectUri: uri,
	}

	return util.SendProtobuf(c, http.StatusOK, redirectData)
}

func (r *Router) postOAuthCodeHandler(c echo.Context) error {
	sess, err := session.Get("session", c)
	if err != nil {
		return c.String(http.StatusBadRequest, err.Error())
	}

	codeData := &rest.PostCodeRequest{}
	err = util.BindProtobuf(c, codeData)
	if err != nil {
		return c.String(http.StatusBadRequest, err.Error())
	}

	verifier := sess.Values["verifier"].(string)
	opts := &traq.Oauth2ApiPostOAuth2TokenOpts{
		Code:         optional.NewString(codeData.GetCode()),
		ClientId:     optional.NewString(r.conf.Client_ID),
		CodeVerifier: optional.NewString(verifier),
	}
	token, res, err := r.cli.Oauth2Api.PostOAuth2Token(context.Background(), "authorization_code", opts)
	if err != nil || token.AccessToken == "" || res.StatusCode >= 400 {
		return c.String(res.StatusCode, err.Error())
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

	return c.NoContent(http.StatusCreated)
}
