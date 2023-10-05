import "./SideMenu.css"
import {Link} from "react-router-dom";
import {useState, useEffect} from 'react';
import React from "react";

export default function SideMenu({events, map, setCurrMarker, currID}) {
    const [currentEvents, setEvents] = useState(events);
    useEffect(() => {
        // setEvents(events.filter( data => data.id === currID.id));
     // if (currID) setEvent(tempData.filter( data => data.id === currID.id));
     console.log(currentEvents);
    //  console.log();
     console.log(currID)
         }, [currID])

const handleMouseEnter = (lat, lng, id) => {
    setCurrMarker(id);
    map.panTo({ lat, lng });
  };
  const handleMouseOut = () => {
    setCurrMarker(null);
  };



    return(

        <>
        <div className="bg-light position-absolute top-50 start-0 translate-middle SideMenu border-end shadow pt-5 ps-3 overflow-auto">
<p className="p-0 m-1 text-light">Love my cats.</p>
{events?.sort((a, b) => a.distance_miles - b.distance_miles).map(event =>{
    let lat = Number(event?.lat);
    let lng = Number(event?.lng);
    console.log('lat: ', lat)
    return(
        <Link to={`../event/${event.id}`}>
    <div className="SideContainer" onMouseEnter={() => handleMouseEnter(lat, lng, event.id)} onMouseLeave={() => handleMouseOut()}>
<div class="card p-0 m-0 text-bg-dark SideCard position-absolute shadow-sm" style={{backgroundImage: `url(${event.picture})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center'}}>
</div>
<div class="card p-0 m-0 text-bg-dark position-relative bg-transparent">
  <div class="card-img-overlay SideText text-light" style={{filter: "brightness(100%)"}}>
    <h5 class="card-title">{event.name}</h5>
    <p class="card-text">{event.info}</p>
    {event.tags.toLowerCase().replace(/[{}]/g, '').split(',').map(tag => <span class="badge m-1 text-bg-dark">{tag.split('_').join(' ')}</span>)}
    <p class="card-text"><small>{event.distance_miles.toFixed(2)}mi away</small></p>
  </div>
</div>
</div>
</Link>)} )}

        </div>
        </>
    )
}


{/* <div className="card mb-3 p-0 h-auto" style={{maxWidth: "32vw"}}>
  <div className="row g-0">
    <div className="col-md-7">
      <div className="card-body">
        <h5 className="card-title">Card title</h5>
        <p className="card-text">This is a wider card with supporting text below as a natural lead-in.</p>

      </div>
    </div>
    <div className="col-md-5 p-0 m-0">
      <img src="https://xsgames.co/randomusers/avatar.php?g=female" className="img-fluid object-fit-cover rounded-end h-100 p-0 m-0" alt="..." />
    </div>
  </div>
</div> */}