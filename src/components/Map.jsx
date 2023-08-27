import './Card.css'

import { useEffect, useState, useRef  } from "react";
import { MarkerClusterer } from "@googlemaps/markerclusterer";
import { tempData } from '../helpers/Objects';

import UserMenu from './UserMenu';
import NewsPanel from './NewsPanel';
import NewButton from './NewButton';
import CauseList from './CauseList';
import EventCards from './EventCards';

import './Card.css'






const Map = () => {
  const [currMap, setMap] = useState();
  const [currID, setID] = useState();

    const mapRef = useRef(null);
     
  useEffect(() => {

    const google = window.google;

    if (google && mapRef.current) {
      const mapOptions = {
        center: { lat: 40.668660, lng: -73.749600 },
        zoom: 11,
        mapId: 'c46a80dd73b97856',
          zoomControl: false,
          mapTypeControl: false,
          scaleControl: false,
          streetViewControl: false,
          rotateControl: false,
          fullscreenControl: false
      };
      

      const map = new google.maps.Map(mapRef.current, mapOptions);
      setMap(map);
      advancedMarkerGenerator();
      async function advancedMarkerGenerator(){
        try {
        const {AdvancedMarkerElement}  =  await google.maps.importLibrary("marker");
        let markers = tempData.map(data =>{

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
               <img src=${photo || "https://xsgames.co/randomusers/avatar.php?g=female"} class="rounded-circle" alt="Avatar"  />
             </div>
             </div>
           </div>`

             return root;
            }

    //         id: 31,
    // cause_id: 2,
    // title: "Queens Night Market",
    // description:
    //   "Queens Night Market serves up a delightful taste of all that Queens has to offer—amazing food at an affordable price point. There will once again be a $5 and $6 price cap per item at the market, even with rising food costs. Since the market first opened in 2015, the festival has highlighted cuisine from around 90 countries and averaged 15,000 attendees every Saturday last year alone.",
    // date: "2023-06-03T00:00:00.000Z",
    // time: "17:00:00",
    // category: "Food",
    // address: "47-01 111th St, Corona, NY, USA",
    // zip: 11368,
    // img_link: "https://media.timeout.com/images/105875911/1372/1029/image.jpg",
    // organizer_user_id: "10",
    // checked_in_users: 0,
    // location: "0101000020E6100000E76F4221827652C01015F428A65F4440",
    // lat: 40.7472583,
    // lng: -73.8516925,
    // city: "Queens County",
    // state: "NY",
    // f_name: "Genovera",
    // l_name: "McCloughlin",
    // user_profile_link:
    //   "http://xsgames.co/randomusers/assets/avatars/female/10.jpg",


            const marker = new AdvancedMarkerElement({
              map,
              position: { lat: data.lat, lng: data.lng },
              content: createElementforEach(data.title, data.time, data.description, data.user_profile_link, data.lat, data.lng, data.id),
            });
            // const marker2 = new AdvancedMarkerElement({
            //   map,
            //   position: { lat: 40.968660, lng: -73.449600 },
            //   content: createElementforEach("Dinner for Two", "2:00PM", "Have a quick bite while funding Mental Health Awareness"),
            // });
            google.maps.event.addListener(marker, 'click', function() { 
              let LatLng = document.getElementById(data.id);
              let LatLngArray = LatLng.getAttribute("data-bridges").split("_");
              let LatLngCurrent = {lat: Number(LatLngArray[0]), lng: Number(LatLngArray[1])};
              map.panTo(LatLngCurrent)
              setID({position: {lat: Number(LatLngArray[0]), lng: Number(LatLngArray[1]) }, id: data});
              
              console.log(LatLngCurrent);
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
    }
    
        catch (e) {
            return e;
        }
      }



    }

  }, []);


  return  (
  
  <>
    <UserMenu />
    <EventCards currID={currID} />
    <div ref={mapRef} className="map" >  </div>
    <NewsPanel map={currMap} />
    {/* <CauseList /> */}
    
    <NewButton />
  </>
  );
};
export default Map;




  
