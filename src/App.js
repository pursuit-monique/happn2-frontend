import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./css/custom.css";

import { useState, createContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import New from "./components/New";
import Map from "./components/Map";
import Card from "./components/Card";
// import Login from "./components/Login";
import LogInTest from "./components/LogInTest";
// import Signup from "./components/Signup";
import EventCardTest from "./components/EventCardTest";
import DirectionsMap from "./components/DirectionsMap";
// import LogIn from "./components/Login";
import Main from "./components/video/Main";

import Index from "./components/Index";
import { AuthProvider } from "./context/AuthContext";

export const UserContext = createContext(null);
function App() {
  const [settings, setSettings] = useState({
    radius: 1609.34,
    id: null,
    name: null,
    firstname: "Jane",
    lastname: "Doe",
    roomCode: null,
    roomType: "Generic",
  });

  return (
    <AuthProvider>
      <Router>
        <UserContext.Provider value={{ settings, setSettings }}>
          <Routes>
            {/* <Route path="/" element={<Map />} /> */}
            {/* <Route path="/login" element={<Login />} /> */}
            <Route path="/logintest" element={<LogInTest />} />
            {/* <Route path="/signup" element={<Signup />} /> */}
            <Route path="/card" element={<Card />} />
            <Route path="/event/:id" element={<EventCardTest />} />
            <Route path="/directions" element={<DirectionsMap />} />
            <Route path="/video" element={<Main />} />
            <Route path="/new" element={<New />} />
            <Route path="/" element={<Index />} />
            <Route
              path="/video/:roomID"
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
