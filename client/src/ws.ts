import ReconnectingWebSocket from "reconnecting-websocket";

export const WSConnect = () => {
  const rws = new ReconnectingWebSocket(
    (location.protocol === "https:" ? "wss" : "ws") +
      "://" +
      location.host +
      "/api/ws"
  );

  rws.onclose = () => {
    console.log("WebSocket disconnected");
  };

  rws.onerror = (err) => {
    console.log("WebSocket error: " + err);
  };

  return rws;
};

export const RWS = WSConnect();

export const SetWSOnMessage = (
  rws: ReconnectingWebSocket,
  onMessage: (evt: MessageEvent<any>) => void
) => {
  rws.onmessage = onMessage;
};
