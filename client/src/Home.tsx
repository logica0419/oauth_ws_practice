import axios from "axios";
import "./App.css";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { RWS, SetWSOnMessage } from "./ws";
import { GetRedirectResponse } from "./pb/rest/redirect";
import { WsMessage } from "./pb/ws/message";
import { GetMeResponse } from "./pb/rest/me";

const Home = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [draft, setDraft] = useState("");
  const [messages, setMessages] = useState<WsMessage[]>([]);

  const refContents = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    refContents?.current?.scrollIntoView();
  }, [messages]);

  useEffect(() => {
    axios
      .get("/api/me", { responseType: "arraybuffer" })
      .then((res) => {
        const meData = GetMeResponse.decode(new Uint8Array(res.data));

        setLoggedIn(true);
        setUsername(meData.name);
      })
      .catch(() => {
        axios
          .get("/api/redirect", { responseType: "arraybuffer" })
          .then((res) => {
            const redirectData = GetRedirectResponse.decode(
              new Uint8Array(res.data)
            );
            location.href = redirectData.redirectUri;
          });
      });
  }, []);

  SetWSOnMessage(RWS, (evt) => {
    const messageData = WsMessage.decode(new Uint8Array(evt.data));
    const newMessages: WsMessage[] = [...messages, messageData];
    setMessages(newMessages);
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDraft(e.target.value);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const messageData = WsMessage.create({
      UserID: username,
      Message: draft,
    });

    const buffer = WsMessage.encode(messageData).finish();
    RWS.send(buffer);
    setDraft("");
  };

  return (
    <>
      <h2>Easy WS Messenger</h2>
      {loggedIn && (
        <div>
          <img src="/api/icon" alt="icon" width="40" /> {username}
        </div>
      )}
      <div className="mes-list">
        {messages.map((msg, index) => {
          return (
            <div key={index}>
              {msg.UserID}: {msg.Message}
            </div>
          );
        })}
        <div ref={refContents} />
      </div>
      <form onSubmit={onSubmit}>
        <input type="text" value={draft} onChange={onChange} />
        &nbsp;
        <input type="submit" value="Send" />
      </form>
    </>
  );
};

export default Home;
