package router

import (
	"context"
	"net/http"

	"github.com/hackathon-21winter-05/oauth_ws_practice/model/pb/rest"
	"github.com/labstack/echo-contrib/session"
	"github.com/labstack/echo/v4"
	traq "github.com/sapphi-red/go-traq"
	"google.golang.org/protobuf/proto"
)

func (r *Router) getIconHandler(c echo.Context) error {
	sess, _ := session.Get("session", c)

	accessToken := sess.Values["accessToken"].(string)
	auth := context.WithValue(context.Background(), traq.ContextAccessToken, accessToken)

	v, res, err := r.cli.MeApi.GetMyIcon(auth)
	if err != nil || res.StatusCode != http.StatusOK {
		return c.String(res.StatusCode, err.Error())
	}

	return c.Stream(res.StatusCode, "image/png", v)
}

func (r *Router) getMeHandler(c echo.Context) error {
	sess, _ := session.Get("session", c)

	accessToken := sess.Values["accessToken"]
	auth := context.WithValue(context.Background(), traq.ContextAccessToken, accessToken)

	v, res, err := r.cli.MeApi.GetMe(auth)
	if err != nil || res.StatusCode != http.StatusOK {
		return c.String(res.StatusCode, err.Error())
	}

	meData := rest.GetMeResponse{
		Name: v.Name,
	}

	buffer, err := proto.Marshal(&meData)
	if err != nil {
		return c.String(http.StatusInternalServerError, err.Error())
	}

	return c.Blob(http.StatusOK, "application/octet-stream", buffer)
}
