package main

import (
	"github.com/hackathon-21winter-05/oauth_ws_practice/config"
	"github.com/hackathon-21winter-05/oauth_ws_practice/router"
)

func main() {
	conf, err := config.GetConfig()
	if err != nil {
		panic(err)
	}

	r := router.SetupRouter(conf)

	r.Start()
}
