import axios from "axios";
import "./App.css";
import { useState } from "react";

const Home = () => {
  const [username, setUsername] = useState("");
  const [count, setCount] = useState(0);

  axios
    .get("/api/me")
    .then((res) => {
      setUsername(res.data.name);
    })
    .catch((err) => {
      window.location.href = err.response.data.dist;
    });

  return (
    <>
      <p>
        <button type="button" onClick={() => setCount((count) => count + 1)}>
          count is: {count}
        </button>
      </p>
      <p>
        Hello, <img src="/api/icon" alt="icon" width="50" /> {username}
      </p>
      <p>
        Edit <code>App.tsx</code> and save to test HMR updates.
      </p>
      <p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer">
          Learn React
        </a>
        {" | "}
        <a
          className="App-link"
          href="https://vitejs.dev/guide/features.html"
          target="_blank"
          rel="noopener noreferrer">
          Vite Docs
        </a>
      </p>
    </>
  );
};

export default Home;