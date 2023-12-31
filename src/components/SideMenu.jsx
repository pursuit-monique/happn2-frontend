import "./SideMenu.css"
import {Link} from "react-router-dom";
import {useState, useEffect} from 'react';
import React from "react";

export default function SideMenu({events, search, map, setCurrMarker, currID}) {
    const [currentEvents, setEvents] = useState(events);
    useEffect(() => {
    setEvents(events);
         }, [currID, events, search, map])

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
            { !search ?  currentEvents?.sort((a, b) => a.distance_miles - b.distance_miles).map(event =>{
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
            </Link>)} ) : events?.filter(event => {
                        const tags = event.tags ? event.tags.toLowerCase().replace(/[{}]/g, '').split(',') : [];
                        let result = (tags.includes(search)) || event.name.toLowerCase().split(' ').includes(search);
                        return result;
                    }).sort((a, b) => a.distance_miles - b.distance_miles).map(event =>{
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
                <div className="bg-dark">hghghg</div>
            </div>
            </div>
            </div>
            </Link>)} )  }

        </div>
        </>
    )
}
