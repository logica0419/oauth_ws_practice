import axios from "axios";
import "./App.css";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { RWS, SetWSOnMessage } from "./ws";

const Home = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [draft, setDraft] = useState("");
  const [messages, setMessages] = useState<String[]>([]);

  const refContents = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    refContents?.current?.scrollIntoView();
  }, [messages]);

  useEffect(() => {
    axios
      .get("/api/me")
      .then((res) => {
        setUsername(res.data.name);
        setLoggedIn(true);
      })
      .catch(() => {
        axios.get("/api/redirect").then((res) => {
          location.href = res.data.uri;
        });
      });
  }, []);

  SetWSOnMessage(RWS, (evt) => {
    const newMessages: String[] = [...messages, evt.data];
    setMessages(newMessages);
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDraft(e.target.value);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    RWS.send(username + ": " + draft);
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
          return <div key={index}> {msg} </div>;
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
