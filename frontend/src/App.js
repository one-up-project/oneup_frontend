import "./layout.scss";
import MapView from "./components/MapView";
import Home from "./pages/home/Home";
import Navbar from "./components/navbar/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="layout">
      <div className="navbar">
        <Navbar />
      </div>
      <div className="content">
        <Home />
      </div>
    </div>
  );
}

export default App;
