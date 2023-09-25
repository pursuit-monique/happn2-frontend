import React, { useState, useEffect, useRef } from 'react';

function DirectionsMap({lat, lng, setRadius}) {
  const directionsService = useRef(new window.google.maps.DirectionsService());
  const directionsRenderer = useRef(new window.google.maps.DirectionsRenderer());

  const [start, setStart] = useState(null); // Use null for user's location
  const [end, setEnd] = useState({ lat: 40.7128, lng: -74.0060 }); // Default destination (New York City)
  const [travelMode, setTravelMode] = useState('DRIVING'); // Default travel mode
  const [directions, setDirections] = useState(null);
  const [travelTime, setTravelTime] = useState(null);

  useEffect(() => {
    const map = new window.google.maps.Map(document.getElementById("map"), {
      zoom: 7,
      center: { lat: 41.85, lng: -87.65 },
    });

    directionsRenderer.current.setMap(map);
    directionsRenderer.current.setPanel(document.getElementById("directions-panel"));


  }, []);

  useEffect(() => {
    // Get the user's current location using navigator.geolocation
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setStart({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setRadius({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      });
    } else {
      // Handle the case where geolocation is not available or denied
      console.error("Geolocation is not available.");
    }
  }, []);

  const handleInputChange = () => {
    setEnd({
      'lat': lat,
      'lng': lng,
    });
  };

  const handleTravelModeChange = (event) => {
    setTravelMode(event.target.value);
  };

  useEffect(() => {
    calculateAndDisplayRoute();
  }, [start, end, travelMode]);

  const calculateAndDisplayRoute = () => {
    if (!start || !end) return;

    directionsService.current.route({
      origin: start,
      destination: {
        'lat': lat,
        'lng': lng,
      },
      travelMode: travelMode,
    })
    .then((response) => {
      directionsRenderer.current.setDirections(response);
      setDirections(response);
      const route = response.routes[0];
      if (route && route.legs && route.legs[0] && route.legs[0].duration) {
        const steps = route.legs[0].steps;
        console.log(steps)
        setTravelTime(route.legs[0].duration.text);
        console.log(travelTime)
        console.log(directions)
      } else {
        setTravelTime(null);
      }
    })
    .catch((error) => {
      window.alert("Directions request failed due to " + error.status);
    });
  };

  return (
    <div className="row">
      <div id="floating-panel">
        <b>Travel Mode: </b>
        <select value={travelMode} onChange={handleTravelModeChange}>
          <option value="DRIVING">Driving</option>
          <option value="WALKING">Walking</option>
          <option value="BICYCLING">Bicycling</option>
          <option value="TRANSIT">Transit</option>
        </select>
      </div>
      <div className="col-xl order-1" id="map" style={{ height: "400px", width: "100%", float: "left" }}></div>
      <div className='col-sm bg-light order-2' id="directions-panel"  style={{ height: "400px", width: "100%", float: "left", overflow: "auto" }}>
        {directions && (
          <div>
            <h3>Directions</h3>
            <p>Travel Time: {travelTime}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default DirectionsMap;
