package router

import (
	"context"
	"net/http"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"github.com/labstack/gommon/log"
	traq "github.com/sapphi-red/go-traq"
)

type Router struct {
	cli *traq.APIClient
	e   *echo.Echo
}

type Redirect struct {
	Dist string `json:"dist"`
}

func SetupRouter() *Router {
	client := traq.NewAPIClient(traq.NewConfiguration())
	e := echo.New()
	e.Logger.SetLevel(log.DEBUG)
	e.Logger.SetHeader("${time_rfc3339} ${prefix} ${short_file} ${line} |")
	e.Use(middleware.LoggerWithConfig(middleware.LoggerConfig{Format: "${time_rfc3339} method = ${method} | uri = ${uri} | status = ${status} ${error}\n"}))

	r := &Router{cli: client, e: e}

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
	auth := context.WithValue(context.Background(), traq.ContextAccessToken, "")

	v, res, err := r.cli.MeApi.GetMe(auth)
	if err != nil || res.StatusCode != http.StatusOK {
		return c.JSON(http.StatusSeeOther, Redirect{Dist: "/https://q.trap.jp/api/v3/oauth2/authorize"})
	}

	return c.JSON(http.StatusOK, v)
}
