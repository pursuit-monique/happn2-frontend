/* global google */
import {
    GoogleMapsMarkerClusterer,
    GoogleMarkerClusterer,
    GoogleMap,
    Marker,
    CircleF,
    useLoadScript,
  } from "@react-google-maps/api";
//   import { MarkerClusterer } from "@googlemaps/markerclusterer";
  import axios from 'axios';
  import { useState, useRef, useEffect, useContext } from "react";
  import UserMenu from './UserMenu';
  import NewsPanel from './NewsPanel';
  import NewButton from './NewButton';
  import EventCards from './EventCards';
  import Radius from './Radius';
  import Search from "./Search";

  import { UserContext } from "../App";


const Index = () =>{ 
    const {settings, setSettings} = useContext(UserContext);

    const [mapRef, setMapRef] = useState();
    // const [isOpen, setIsOpen] = useState(false);
    // const [infoWindowData, setInfoWindowData] = useState();
    const [ currID, setID ] = useState();
    const markers = useRef([]);
    const [search, setSearch] = useState([]);
    const results = useRef([]);
    const [currPos, setCurrPos] = useState({lat: 70, lng: 80});
    const classAdvancedMarker = useRef();

    const id = useRef({lat: 70, lng: 80})

    const [pictures, setPictures] = useState([]);

    useEffect(() => {
      // Make an HTTP GET request to the API
      axios.get('https://randomuser.me/api/?results=30&inc=picture')
        .then((response) => {
          // Extract the pictures from the API response
          const newPictures = response.data.results.map((user) => user.picture.medium);
          setPictures(newPictures);
          console.log(newPictures)
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    }, []);


    let options = {
        enableHighAccuracy: false,
        timeout: 30000,
        maximumAge: 0,
      };

      id.current = navigator.geolocation.watchPosition(success, error, options);
    
      const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
    
  });

  function formatDateRange(startDateStr, endDateStr) {
    // Create Date objects from the input strings
    const startDate = new Date(startDateStr);
    const endDate = new Date(endDateStr);
    const currentDate = new Date();
  
    // Define months and days arrays for formatting
    const months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  
    // Function to format a date
  function formatSingleDate(date) {
      const year = date.getFullYear();
      const month = months[date.getMonth()];
      const day = date.getDate();
      const dayOfWeek = days[date.getDay()];
      const hours = date.getHours();
      const minutes = date.getMinutes();
      const seconds = date.getSeconds();
  
      const formattedDate = `${dayOfWeek}, ${month} ${day}, ${year}`;
      // const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  
      return `${formattedDate}`;
    }
  
    // Format the start and end dates
    const formattedStartDate = formatSingleDate(startDate);
    const formattedEndDate = formatSingleDate(endDate);
  
    // Check if the current date is between the start and end dates
    const isCurrentDateBetween = currentDate >= startDate && currentDate <= endDate;
  
    // Create and return the result object
    const result = {
      start: formattedStartDate,
      end: formattedEndDate,
      is_between: isCurrentDateBetween
    };
  
    return result;
  }  



    function success(pos) {
        const crd = pos.coords;
        setCurrPos(pos.coords);
        setCurrPos({ lat: crd.latitude, lng: crd.longitude});
        console.log("center has been set", crd)
    }



  useEffect( () => {
    let map = mapRef; 
    map?.setCenter({ lat: currPos.lat, lng: currPos.lng});
    map?.panTo({ lat: currPos.lat, lng: currPos.lng});
    
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/events`, {
        params: {
          latitude: currPos.lat,
          longitude: currPos.lng,
          radius: settings.radius
        },

      })
      .then(response => {
        console.log(response.data)
        // asyncAdvancedMarkerGenerator((response.data));
        setSettings({...settings, coords: currPos})
        results.current = response.data;
        markers.current?.forEach((Marker => Marker.setMap(null)));
        console.log('search.current', search)
        search.length > 0 ?   results.current.filter(event => {
            const tags = event.tags ? event.tags.toLowerCase().replace(/[{}]/g, '').split(',') : [];
            let result = (tags.includes(search)) || event.name.toLowerCase().split(' ').includes(search);
            return result;
        }).forEach((event) => asyncAdvancedMarkerGenerator(event)) : results.current.forEach((event) => asyncAdvancedMarkerGenerator(event))
      })
      .catch(error => {
        console.error("Error: ", error);

        throw error;
      });
console.log(GoogleMapsMarkerClusterer)
console.log(GoogleMarkerClusterer)
// const markersList = markers.current;
console.log(markers.current)
// const cluster = new GoogleMapsMarkerClusterer.Cluster(map, markersList)
// const markersList = markers.current;
    // new MarkerClusterer({  map, markersList });
}, [ currPos, settings.radius, search])

function pinSymbol(color) {
    return {
        path: 'M 0,0 C -2,-20 -10,-22 -10,-30 A 10,10 0 1,1 10,-30 C 10,-22 2,-20 0,0 z M -2,-30 a 2,2 0 1,1 4,0 2,2 0 1,1 -4,0',
        fillColor: color,
        fillOpacity: 1,
        strokeColor: '#314983',
        strokeWeight: 2,
        scale: 1,
   };
  }
  
function createElementforEach(title, description, photo, lat, lng, id, start_date, end_date){
    const root = document.createElement("div");
    // console.log('i', i)
    console.log('pictures', pictures)
    console.log(formatDateRange(start_date, end_date).is_between, start_date, end_date)
    root.innerHTML = `
 
         <div class="avatar__container" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Tooltip on top">
    <div class="avatar rounded-circle border ${formatDateRange(start_date, end_date).is_between ? "border-info" : "border-danger" }">
      <img src=${ pictures[id]} id="Avatar${id}" class="rounded-circle" alt="Avatar"  />
    </div> 
    </div>`

    return root;
}
console.log(Marker)

async function asyncAdvancedMarkerGenerator(data, i){
    const AdvancedMarker = await google.maps.importLibrary("marker")
        .then(markerLibrary =>{
            classAdvancedMarker.current = markerLibrary;
            }
        )
       
        let map = mapRef; 
        const marker = new classAdvancedMarker.current.AdvancedMarkerElement({
            map,
            position: { lat: data.lat, lng: data.lng },
            content: createElementforEach(data.name, data.info, data.picure, data.lat, data.lng, data.id, data.start_date, data.end_date),
          });
          console.log(data.end_date)

          marker.addListener("click", () => {
            map.setZoom(12);
            map.setCenter({lat: data.lat, lng: data.lng});
            setID({position: {lat: data.lat, lng: data.lng }, id: data});
            console.log(data)
          })
        markers.current.push(marker);
        //   console.log(marker)
        //   markers.current.push(marker);
        //   console.log(markers.current)
        //   const markerList = markers.current
        //   const cluster = new MarkerClusterer({ map, markerList });
}
  const onMapLoad = (map) => {
    setMapRef(map);
    const bounds = new google.maps.LatLngBounds();
    map.fitBounds(bounds);
    // Create the Feature layer to focus on NY
    const featureLayer = map.getFeatureLayer(
        google.maps.FeatureType.ADMINISTRATIVE_AREA_LEVEL_1,
      );
    const featureStyleOptions = {
        strokeColor: "#314983",
        strokeOpacity: 1.0,
        strokeWeight: 4.0,
        fillColor: "#314983",
        fillOpacity: 1.0,
    };

    featureLayer.style = (options) => {
    //PlaceId for New York State:  Requires Administrative level I
        if (options.feature.placeId !== "ChIJqaUj8fBLzEwRZ5UY3sHGz90") {
            return featureStyleOptions;
         }
    };
  };

  const handleMarkerClick = (id, lat, lng, address) => {
    mapRef?.panTo({ lat, lng });
    // setInfoWindowData({ id, address });
    // setIsOpen(true);
  };

  function error(err) {
    console.error(`ERROR(${err.code}): ${err.message}`);
  }

    return (
        <>
      {!isLoaded ? (
        <h1>Loading...</h1>
      ) : (
        <>
            <UserMenu />
            <Radius />
            <EventCards currID={currID} />
            <GoogleMap
                mapContainerClassName="map"
                onLoad={onMapLoad}
                // onClick={() => setIsOpen(false)}
                options={{
                zoom: 11,
                mapId: 'c46a80dd73b97856',
                zoomControl: false,
                mapTypeControl: false,
                scaleControl: false,
                streetViewControl: false,
                rotateControl: false,
                fullscreenControl: false}}
            >
          <Marker key={999} position={{lat: currPos.lat, lng: currPos.lng}} icon={pinSymbol("#7ddcd9")      
          } />
        <CircleF options={{
  strokeColor: "#ec8527",
  strokeOpacity: 0.6,
  strokeWeight: 2,
  fillColor: "#F7DFBC",
  fillOpacity: 0.25,
  center: {
    lat: currPos.lat, lng: currPos.lng
  },
  radius: settings.radius,
  clickable: false,
  draggable: false,
  editable: false,
  visible: true,
  zIndex: 1,
}} />
        </GoogleMap>
        <NewsPanel map={mapRef} />
        <Search search={search} setSearch={setSearch} />
    {/* <CauseList /> */}
    
    <NewButton />
        </>
      )}
      </>
    )
}

export default Index;