import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./css/custom.css";

import { useState, createContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import NewEvent from "./components/NewEvent";
import Map from "./components/Map";
import Card from "./components/Card";
import Login from "./components/Login";
import Signup from "./components/Signup";
import EventCardTest from "./components/EventCardTest";
import DirectionsMap from "./components/DirectionsMap";
import LogIn from "./components/LogIn";
import Main from "./components/video/Main";

import { AuthProvider } from "./context/AuthContext";



export const UserContext = createContext(null);
function App() {
  const [settings, setSettings] = useState({
    radius: 1609.34,
    id: null,
    name: null,
    firstName: "Jane",
    lastName: "Doe",
    roomCode: null,
    roomType: "Generic",
  });

  return (
    <AuthProvider>
      <Router>
        <UserContext.Provider value={{ settings, setSettings }}>
          <Routes>
            <Route path="/" element={<Map />} />
            <Route path="/login" element={<Login />} />


          <Route path="/signup" element={<Signup />} />
          <Route path="/card" element={<Card />} />
          <Route path="/test" element={<EventCardTest />} />
          <Route path="/directions" element={<DirectionsMap />} />
          <Route path="/login" element={<LogIn />} />
          <Route
            path="/video"
            element={
              <Main
              // firstname={firstname || "Jane"}
              // lastname={lastname || "Doe"}
              // roomCode={roomCode || "sjhsjsj"}
              // roomType={roomType || "Generic"}
              />
            }
          />
          </Routes>
        </UserContext.Provider>
      </Router>
    </AuthProvider>
  );
}

export default App;
