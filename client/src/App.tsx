import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import OAuth from "./OAuth";
import Home from "./Home";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Hello Vite + React!</p>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="oauth" element={<OAuth />} />
          <Route path="*" element={<p>Not Found</p>} />
        </Routes>
      </header>
    </div>
  );
}

export default App;
