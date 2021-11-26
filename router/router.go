package router

import (
	"net/http"

	"github.com/gorilla/sessions"
	"github.com/hackathon-21winter-05/oauth_ws_practice/config"
	"github.com/labstack/echo-contrib/session"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"github.com/labstack/gommon/log"
	traq "github.com/sapphi-red/go-traq"
)

type Router struct {
	conf *config.Config
	cli  *traq.APIClient
	e    *echo.Echo
	s    *streamer
}

type Redirect struct {
	URI string `json:"uri"`
}

func SetupRouter(conf *config.Config) *Router {
	client := traq.NewAPIClient(traq.NewConfiguration())

	s := setupStreamer()

	e := echo.New()
	e.Logger.SetLevel(log.DEBUG)
	e.Logger.SetHeader("${time_rfc3339} ${prefix} ${short_file} ${line} |")
	e.Use(middleware.LoggerWithConfig(middleware.LoggerConfig{Format: "${time_rfc3339} method = ${method} | uri = ${uri} | status = ${status} ${error}\n"}))

	e.Use(session.Middleware(sessions.NewCookieStore([]byte("secret"))))

	r := &Router{
		conf: conf,
		cli:  client,
		e:    e,
		s:    s,
	}

	api := r.e.Group("/api")
	{
		api.GET("/ping", func(c echo.Context) error {
			return c.String(http.StatusOK, "pong")
		})
		api.GET("/me", r.getMeHandler)
		api.GET("/icon", r.getIconHandler)
		api.GET("/redirect", r.getRedirectHandler)
		api.GET("/ws", r.getWebSocketHandler)
		api.POST("/code", r.postOAuthCodeHandler)
	}

	r.e.Static("/", "client/dist")
	r.e.File("/oauth", "client/dist/index.html")

	return r
}

func (r *Router) Start() {
	r.s.start()
	r.e.Logger.Panic(r.e.Start(":7070"))
}
