import "./App.css";
import MapView from "./components/MapView";
import Home from "./pages/Home";
import Principal_Page from "./pages/Principal_Page";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
function App() {
  return (
    // to do
    // ver video para implementar rutas
    <Router>
      <Routes>
        <Route exact path="/" component={Principal_Page} /> {/* ruta raiz */}
        <Route exact path="/home" component={Home} /> {/* ruta home */}
        <Route exact path="/search" component={MapView} /> {/* ruta search */}
      </Routes>
    </Router>
  );
}

export default App;
