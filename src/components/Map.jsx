import './Card.css'

import axios from 'axios';
import { useEffect, useState, useRef, useContext } from "react";
import { MarkerClusterer } from "@googlemaps/markerclusterer";
// import { AdvancedMarkerElement} from "@googlemaps/react-wrapper"
import {Marker} from '@googlemaps/adv-markers-utils';
// import { tempData } from '../helpers/Objects';

import UserMenu from './UserMenu';
import NewsPanel from './NewsPanel';
import NewButton from './NewButton';
import EventCards from './EventCards';
import Radius from './Radius';

import { UserContext } from "../App";

import './Card.css'






const Map = () => {
  const {settings, setSettings} = useContext(UserContext);

  const [currMap, setMap] = useState();
  const [currID, setID] = useState();
  const [radiusMarker, setRadiusMarker] = useState();

  const [currPos, setCurrPos] = useState();
  const [tempData, setTempData] = useState();

  const mapRef = useRef(null);

  let google;
  let map;
  
  let id = useRef(null);
  // console.log("wasting cpu resources:", id.current);
    useEffect(()=>{
      if (radiusMarker) 
      {radiusMarker.setRadius(settings.radius);
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/events`, {
          params: {
            latitude: currPos.lat,
            longitude: currPos.lng,
            radius: settings.radius,
          },
          
        })
        .then(response => {
          // console.log("Success: ", response.data);
      
          setTempData(response.data);
          // console.log(AdvancedMarkerElement)
          // console.log()
          // console.log(currMap, map);
          let map = currMap;
          response.data.map(newMarker => new Marker({map, 'position': { lat: newMarker.lat, lng: newMarker.lng }}))
          
        })
        .catch(error => {
          console.error("Error: ", error);
  
          throw error;
        });
  
      }


    },[settings.radius])

    function error(err) {
      console.error(`ERROR(${err.code}): ${err.message}`);
    }

    
    let options = {
      enableHighAccuracy: false,
      timeout: 30000,
      maximumAge: 0,
    };
    

    async function advancedMarkerGenerator(){
      // console.log('makingmarkers')
      try {
      const {AdvancedMarkerElement}  =  await google.maps.importLibrary("marker").then(info => {

      
      let markers = tempData.map(info =>{
        
          // console.log('markercreated')
          function createElementforEach(title, time, description, photo, lat, lng, id){
           const root = document.createElement("div");
           root.innerHTML = `<div class="event-container" id=${id} data-bridges="${lat}_${lng}">
           <div class="event-background"></div>
           <div class="event-content bottom">
             <h4>${title}</h4>
             <em>Today at ${time}</em>
             <p class="event-description">${description}</p>
           </div>
           <div class="avatar__container">
           <div class="avatar rounded-circle">
             <img src=${photo || "https://xsgames.co/randomusers/avatar.php?g=female"} id="Avatar${id}" class="rounded-circle" alt="Avatar"  />
           </div>
           </div>
         </div>`

           return root;
      }
let map = currMap
          const marker = new info({
            map,
            position: { lat: info.lat, lng: info.lng },
            content: createElementforEach(info.name, info.time, info.info, 'https://static.vecteezy.com/system/resources/previews/009/952/670/original/female-profile-picture-vector.jpg', info.lat, info.lng, info.id),
          });
          google.maps.event.addListener(marker, 'click', function() { 
            let LatLng = document.getElementById(info.id);
            let LatLngArray = LatLng.getAttribute("data-bridges").split("_");
            let LatLngCurrent = {lat: Number(LatLngArray[0]), lng: Number(LatLngArray[1])};
            map.panTo(LatLngCurrent)
            setID({position: {lat: Number(LatLngArray[0]), lng: Number(LatLngArray[1]) }, id: info});
            
            // console.log(LatLngCurrent);
         }); 
      //    marker2.addListener("click", () => {
      //     map.setZoom(8);
      //     map.setCenter(marker.getPosition());
      //  }); 
      return marker;
        }
);
    //  } //end of for each
    new MarkerClusterer({ markers, map });
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
  })}
  
      catch (e) {
          return e;
      }
    }


    
  useEffect(() => {


    google = window.google;

    if (google && mapRef.current) {
      const mapOptions = {
        center: { lat: currPos?.latitude || 40, lng: currPos?.longitude || -72 },
        zoom: 11,
        mapId: 'c46a80dd73b97856',
          zoomControl: false,
          mapTypeControl: false,
          scaleControl: false,
          streetViewControl: false,
          rotateControl: false,
          fullscreenControl: false
      };

      map = new google.maps.Map(mapRef.current, mapOptions);
      setMap(map);
      advancedMarkerGenerator();
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
      var marker2 = new google.maps.Marker({
        position: {lat: 40.7749, lng: -72.4194}, 
        map: map,
        icon: pinSymbol("#7ddcd9"),
        title: 'You!'
      });
      const radius = new google.maps.Circle({
        strokeColor: "#ec8527",
        strokeOpacity: 0.6,
        strokeWeight: 2,
        fillColor: "#F7DFBC",
        fillOpacity: 0.25,
        map,
        center: {lat: 40.7749, lng: -72.4194},
        radius: settings.radius, // Measured in meters, apparently
        });
        radius.bindTo('center', marker2, 'position');

      id.current = navigator.geolocation.watchPosition(success, error, options);

      function success(pos) {
        const crd = pos.coords;
        setCurrPos(crd);
        map.setCenter({ lat: crd.latitude, lng: crd.longitude});
        map.panTo({ lat: crd.latitude, lng: crd.longitude});
        setCurrPos({ lat: crd.latitude, lng: crd.longitude});
        setSettings({...settings, lat: crd.latitude, lng: crd.longitude})
        console.log('settings', settings);
        var newCoordinates = new google.maps.LatLng(crd.latitude, crd.longitude);
        marker2.setPosition(newCoordinates);
        setRadiusMarker(radius);
        radius.setRadius(settings.radius);
      console.log("center has been set", crd)
      axios.get(`${process.env.REACT_APP_BACKEND_URL}/events`, {
        params: {
          latitude: crd.latitude,
          longitude: crd.longitude,
          radius: settings.radius,
        },
        
      })
      .then(response => {
        console.log("Success: ", response.data);
    
        return response.data;
      })
      .catch(error => {
        console.error("Error: ", error);

        throw error;
      });




        }

  //     async function advancedMarkerGenerator(){
  //       try {
  //       const {AdvancedMarkerElement}  =  await google.maps.importLibrary("marker");


  //       let markers = tempData.map(data =>{
          

  //           function createElementforEach(title, time, description, photo, lat, lng, id){
  //            const root = document.createElement("div");
  //            root.innerHTML = `<div class="event-container" id=${id} data-bridges="${lat}_${lng}">
  //            <div class="event-background"></div>
  //            <div class="event-content bottom">
  //              <h4>${title}</h4>
  //              <em>Today at ${time}</em>
  //              <p class="event-description">${description}</p>
  //            </div>
  //            <div class="avatar__container">
  //            <div class="avatar rounded-circle">
  //              <img src=${photo || "https://xsgames.co/randomusers/avatar.php?g=female"} id="Avatar${id}" class="rounded-circle" alt="Avatar"  />
  //            </div>
  //            </div>
  //          </div>`

  //            return root;
  //           }

  //           const marker = new AdvancedMarkerElement({
  //             map,
  //             position: { lat: data.lat, lng: data.lng },
  //             content: createElementforEach(data.title, data.time, data.description, data.user_profile_link, data.lat, data.lng, data.id),
  //           });
  //           google.maps.event.addListener(marker, 'click', function() { 
  //             let LatLng = document.getElementById(data.id);
  //             let LatLngArray = LatLng.getAttribute("data-bridges").split("_");
  //             let LatLngCurrent = {lat: Number(LatLngArray[0]), lng: Number(LatLngArray[1])};
  //             map.panTo(LatLngCurrent)
  //             setID({position: {lat: Number(LatLngArray[0]), lng: Number(LatLngArray[1]) }, id: data});
              
  //             console.log(LatLngCurrent);
  //          }); 
  //       //    marker2.addListener("click", () => {
  //       //     map.setZoom(8);
  //       //     map.setCenter(marker.getPosition());
  //       //  }); 
  //       return marker;
  //         }
  // );
  //     //  } //end of for each
  //     new MarkerClusterer({ markers, map });
  //       const featureLayer = map.getFeatureLayer(

  //         google.maps.FeatureType.ADMINISTRATIVE_AREA_LEVEL_1,
  //       );

  // const featureStyleOptions = {
  //   strokeColor: "#314983",
  //   strokeOpacity: 1.0,
  //   strokeWeight: 4.0,
  //   fillColor: "#314983",
  //   fillOpacity: 1.0,
  // };

  // featureLayer.style = (options) => {
  //   //PlaceId for New York State:  Requires Administrative level I
  //   if (options.feature.placeId !== "ChIJqaUj8fBLzEwRZ5UY3sHGz90") {
  //     return featureStyleOptions;
  //   }
  // };
  //   }
    
  //       catch (e) {
  //           return e;
  //       }
  //     }



    }

  }, []);


  return  (
  
  <>
    <UserMenu />
    <Radius />
    <EventCards currID={currID} />
    <div ref={mapRef} className="map" >  </div>
    <NewsPanel map={currMap} />
    {/* <CauseList /> */}
    
    <NewButton />
  </>
  );
};
export default Map;




  
