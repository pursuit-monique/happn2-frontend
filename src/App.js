import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./css/custom.css";

import { BrowserRouter, Routes, Route } from "react-router-dom"; // Use BrowserRouter here

import NewEvent from "./components/NewEvent";
import Map from "./components/Map";
import Card from "./components/Card";
// import Markers from "./components/Marker";

function App() {
  return (
    <BrowserRouter>
      {" "}
      <Routes>
        <Route path="/new" element={<NewEvent />} />
        <Route path="/" element={<Map />} />
        <Route path="/card" element={<Card />} />
        {/* <Route path="/markers" element={<Markers />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
