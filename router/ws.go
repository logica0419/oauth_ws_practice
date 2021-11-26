package router

import (
	"net/http"
	"sync"

	"github.com/gorilla/websocket"
	"github.com/labstack/echo/v4"
)

type client struct {
	conn     *websocket.Conn
	receiver *chan string
	sender   chan string
}

type streamer struct {
	clients  []*client
	receiver chan string
}

var messages = []string{}

func (r *Router) getWebSocketHandler(c echo.Context) error {
	upgrader := websocket.Upgrader{}
	conn, err := upgrader.Upgrade(c.Response(), c.Request(), nil)
	if err != nil {
		return c.String(http.StatusInternalServerError, err.Error())
	}

	cli := &client{conn: conn, receiver: &r.s.receiver, sender: make(chan string)}
	go cli.listen()
	go cli.serve()

	for _, mes := range messages {
		cli.sender <- mes
	}

	r.s.clients = append(r.s.clients, cli)

	wg := &sync.WaitGroup{}
	wg.Add(1)
	wg.Wait()

	return c.NoContent(http.StatusOK)
}

func setupStreamer() *streamer {
	s := &streamer{
		clients:  []*client{},
		receiver: make(chan string),
	}

	go s.listen()

	return s
}

func (s *streamer) listen() {
	for {
		mes := <-s.receiver
		messages = append(messages, mes)
		s.sendAll(mes)
	}
}

func (s *streamer) sendAll(mes string) {
	for _, client := range s.clients {
		client.sender <- mes
	}
}

func (cli *client) listen() {
	for {
		_, message, err := cli.conn.ReadMessage()
		if err != nil {
			break
		}

		*cli.receiver <- string(message)
	}
}

func (cli *client) serve() {
	for {
		mes := <-cli.sender
		err := cli.conn.WriteMessage(websocket.TextMessage, []byte(mes))
		if err != nil {
			break
		}
	}
}
