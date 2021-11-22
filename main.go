package main

import "github.com/hackathon-21winter-05/oauth_ws_practice/router"

func main() {
	r := router.SetupRouter()

	r.Start()
}
