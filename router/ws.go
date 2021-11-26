package router

import (
	"net/http"

	"github.com/gorilla/websocket"
	"github.com/labstack/echo/v4"
)

type client struct {
	conn     *websocket.Conn
	receiver *chan string
	sender   chan string
	close    chan bool
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
	defer conn.Close()

	cli := &client{conn: conn, receiver: &r.s.receiver, sender: make(chan string), close: make(chan bool)}
	go cli.serve()
	go cli.listen()

	for _, mes := range messages {
		cli.sender <- mes
	}

	r.s.clients = append(r.s.clients, cli)

	<-cli.close

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
			cli.close <- true
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
			cli.close <- true
			break
		}
	}
}
