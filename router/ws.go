package router

import (
	"net/http"
	"sync"

	"github.com/google/uuid"
	"github.com/gorilla/websocket"
	"github.com/labstack/echo/v4"
)

type client struct {
	id       uuid.UUID
	conn     *websocket.Conn
	receiver *chan []byte
	sender   chan []byte
	closer   chan bool
}

type streamer struct {
	clients       map[uuid.UUID]*client
	receiveBuffer chan []byte
}

type messagesStruct struct {
	messages [][]byte
	sync.RWMutex
}

var messages = messagesStruct{messages: [][]byte{}}

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
		sender:   make(chan []byte),
		closer:   make(chan bool),
	}

	go cli.serve()
	go cli.listen()

	messages.RLock()
	for _, mes := range messages.messages {
		cli.sender <- mes
	}
	messages.RUnlock()

	r.s.clients[clientID] = cli

	<-cli.closer

	delete(r.s.clients, clientID)

	return c.NoContent(http.StatusOK)
}

func setupStreamer() *streamer {
	s := &streamer{
		clients:       map[uuid.UUID]*client{},
		receiveBuffer: make(chan []byte),
	}

	return s
}

func (s *streamer) start() {
	go s.listen()
}

func (s *streamer) listen() {
	for {
		mes := <-s.receiveBuffer

		messages.Lock()
		messages.messages = append(messages.messages, mes)
		messages.Unlock()

		s.sendAll(mes)
	}
}

func (s *streamer) sendAll(mes []byte) {
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

		*cli.receiver <- message
	}
}

func (cli *client) serve() {
	for {
		mes := <-cli.sender
		err := cli.conn.WriteMessage(websocket.BinaryMessage, mes)
		if err != nil {
			cli.closer <- true
			break
		}
	}
}
