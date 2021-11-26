package router

import (
	"net/http"

	"github.com/google/uuid"
	"github.com/gorilla/websocket"
	"github.com/labstack/echo/v4"
)

type client struct {
	id       uuid.UUID
	conn     *websocket.Conn
	receiver *chan string
	sender   chan string
	closer   chan bool
}

type streamer struct {
	clients       map[uuid.UUID]*client
	receiveBuffer chan string
}

var messages = []string{}

func (r *Router) getWebSocketHandler(c echo.Context) error {
	upgrader := websocket.Upgrader{}
	conn, err := upgrader.Upgrade(c.Response(), c.Request(), nil)
	if err != nil {
		return c.String(http.StatusInternalServerError, err.Error())
	}
	defer conn.Close()

	clientID := uuid.New()

	cli := &client{
		id:       clientID,
		conn:     conn,
		receiver: &r.s.receiveBuffer,
		sender:   make(chan string),
		closer:   make(chan bool),
	}

	go cli.serve()
	go cli.listen()

	for _, mes := range messages {
		cli.sender <- mes
	}

	r.s.clients[clientID] = cli

	<-cli.closer

	delete(r.s.clients, clientID)

	return c.NoContent(http.StatusOK)
}

func setupStreamer() *streamer {
	s := &streamer{
		clients:       map[uuid.UUID]*client{},
		receiveBuffer: make(chan string),
	}

	go s.listen()

	return s
}

func (s *streamer) listen() {
	for {
		mes := <-s.receiveBuffer
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
			cli.closer <- true
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
			cli.closer <- true
			break
		}
	}
}
