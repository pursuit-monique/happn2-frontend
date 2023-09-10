import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./css/custom.css";

import { useState, createContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import NewEvent from "./components/NewEvent";
import Map from "./components/Map";
import Card from "./components/Card";
import EventCardTest from "./components/EventCardTest";

// import Markers from "./components/Marker
export const UserContext = createContext(null);
function App() {
  const [settings, setSettings] = useState({
    radius: 1609.34,
    id: null,
    name: null,
  });

  return (
    <BrowserRouter>
      {" "}
      <UserContext.Provider value={{ settings, setSettings }}>
        <Routes>
          <Route path="/new" element={<NewEvent />} />
          <Route path="/" element={<Map />} />

          <Route path="/card" element={<Card />} />
          <Route path="/test" element={<EventCardTest />} />
          {/* <Route path="/markers" element={<Markers />} /> */}
        </Routes>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
