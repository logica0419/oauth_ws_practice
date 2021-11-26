package router

import (
	"net/http"

	"github.com/gorilla/websocket"
	"github.com/labstack/echo/v4"
)

type client struct {
	conn     *websocket.Conn
	receiver *chan string
	sender   chan []string
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

	client := &client{conn: conn, receiver: &r.s.receiver, sender: make(chan []string)}
	go client.listen()
	go client.serve()

	client.sender <- messages

	r.s.clients = append(r.s.clients, client)

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
		messages = append(messages, <-s.receiver)
		s.sendAll(messages)
	}
}

func (s *streamer) sendAll(msg []string) {
	for _, client := range s.clients {
		client.sender <- msg
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
		err := cli.conn.WriteJSON(<-cli.sender)
		if err != nil {
			break
		}
	}
}
