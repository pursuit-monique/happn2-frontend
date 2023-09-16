import React, { useState, useEffect, useRef } from 'react';

function DirectionsMap() {
  const directionsService = useRef(new window.google.maps.DirectionsService());
  const directionsRenderer = useRef(new window.google.maps.DirectionsRenderer());

  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');

  useEffect(() => {
    const map = new window.google.maps.Map(document.getElementById("map"), {
      zoom: 7,
      center: { lat: 41.85, lng: -87.65 },
    });

    directionsRenderer.current.setMap(map);

    const startInput = document.getElementById("start");
    const endInput = document.getElementById("end");

    startInput.addEventListener("change", handleInputChange);
    endInput.addEventListener("change", handleInputChange);

    return () => {
      startInput.removeEventListener("change", handleInputChange);
      endInput.removeEventListener("change", handleInputChange);
    };
  }, []);

  const handleInputChange = () => {
    setStart(document.getElementById("start").value);
    setEnd(document.getElementById("end").value);
  };

  useEffect(() => {
    calculateAndDisplayRoute();
  }, [start, end]);

  const calculateAndDisplayRoute = () => {
    directionsService.current.route({
      origin: {
        query: start,
      },
      destination: {
        query: end,
      },
      travelMode: window.google.maps.TravelMode.DRIVING,
    })
    .then((response) => {
      directionsRenderer.current.setDirections(response);
    })
    .catch((error) => {
      window.alert("Directions request failed due to " + error.status);
    });
  };

  return (
    <div>
        <div id="floating-panel">
      <b>Start: </b>
      <select id="start">
        <option value="chicago, il">Chicago</option>
        <option value="st louis, mo">St Louis</option>
        <option value="joplin, mo">Joplin, MO</option>
        <option value="oklahoma city, ok">Oklahoma City</option>
        <option value="amarillo, tx">Amarillo</option>
        <option value="gallup, nm">Gallup, NM</option>
        <option value="flagstaff, az">Flagstaff, AZ</option>
        <option value="winona, az">Winona</option>
        <option value="kingman, az">Kingman</option>
        <option value="barstow, ca">Barstow</option>
        <option value="san bernardino, ca">San Bernardino</option>
        <option value="los angeles, ca">Los Angeles</option>
      </select>
      <b>End: </b>
      <select id="end">
        <option value="chicago, il">Chicago</option>
        <option value="st louis, mo">St Louis</option>
        <option value="joplin, mo">Joplin, MO</option>
        <option value="oklahoma city, ok">Oklahoma City</option>
        <option value="amarillo, tx">Amarillo</option>
        <option value="gallup, nm">Gallup, NM</option>
        <option value="flagstaff, az">Flagstaff, AZ</option>
        <option value="winona, az">Winona</option>
        <option value="kingman, az">Kingman</option>
        <option value="barstow, ca">Barstow</option>
        <option value="san bernardino, ca">San Bernardino</option>
        <option value="los angeles, ca">Los Angeles</option>
      </select>
    </div>
      <input id="start" type="text" placeholder="Start Location" />
      <input id="end" type="text" placeholder="End Location" />
      <div id="map" style={{ height: "400px", width: "100%" }}></div>
    </div>
  );
}

export default DirectionsMap;
