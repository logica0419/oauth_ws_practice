import axios from "axios";
import "./App.css";
import { Fragment, useEffect, useState } from "react";
import { RWS, SetWSOnMessage } from "./ws";

const Home = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [count, setCount] = useState(0);
  const [draft, setDraft] = useState("");
  const [messages, setMessages] = useState<Array<String>>([]);

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

    SetWSOnMessage(RWS, (evt) => {
      let newMessages = messages;
      newMessages.push(evt.data);

      setMessages(newMessages);
    });
  }, []);

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
      <p>
        <button type="button" onClick={() => setCount((count) => count + 1)}>
          count is: {count}
        </button>
      </p>
      {loggedIn && (
        <p>
          {"Hello,"} <img src="/api/icon" alt="icon" width="50" /> {username}
        </p>
      )}
      {messages.map((msg, index) => {
        return <div key={index}> {msg} </div>;
      })}
      <form onSubmit={onSubmit}>
        <input type="text" value={draft} onChange={onChange} />
        <input type="submit" />
      </form>
    </>
  );
};

export default Home;
