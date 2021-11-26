import "./App.css";
import { Route, Routes } from "react-router-dom";
import OAuth from "./OAuth";
import Home from "./Home";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="oauth" element={<OAuth />} />
        <Route path="*" element={<p>Not Found</p>} />
      </Routes>
    </div>
  );
}

export default App;
