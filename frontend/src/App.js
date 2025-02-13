import "./layout.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import UserNavbar from "./components/navbar/UserNavbar";  
import StoreNavbar from "./components/navbar/StoreNavbar";  

import Home from "./pages/home/Home";
import UserManagement from "./pages/usermanagement/UserManagement";
import UserProfile from "./pages/usermanagement/UserProfile";

import StoreManagement from "./pages/storemanagement/StoreManagement";
import StoreProfile from "./pages/storemanagement/StoreProfile";
import StoreHistory from "./pages/storemanagement/StoreHistory";

function App() {
  return (
    <Router>
      <div className="layout">
        {/* Navbar correcto según la ruta */}
        <div className="navbar">
          <Routes>
            <Route path="/" element={<Navbar />} />
            <Route path="/usermanagement/*" element={<UserNavbar />} />
            <Route path="/storemanagement/*" element={<StoreNavbar />} />
          </Routes>
        </div>

        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            
            {/* User Management */}
            <Route path="/usermanagement" element={<UserManagement />} />
            <Route path="/usermanagement/profile" element={<UserProfile />} />

            {/* Store Management */}
            <Route path="/storemanagement" element={<StoreManagement />} />
            <Route path="/storemanagement/profile" element={<StoreProfile />} />
            <Route path="/storemanagement/history" element={<StoreHistory />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
