import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import {
  DirectionsRenderer,
  DirectionsService
} from '@react-google-maps/api'
import { Wrapper } from "@googlemaps/react-wrapper";


import axios from "axios";
import "./EventCardTest.css";
// import { reauthenticateWithCredential } from "firebase/auth";
import { useContext } from "react";
import { useParams, useNavigate } from 'react-router-dom';

import DirectionsMap from "./DirectionsMap";

import { UserContext } from "../App";

export default function EventCardTest(){
  const {id} = useParams();
  const {settings, setSettings} = useContext(UserContext);
  const [ broadcasts, setBroadcasts] = useState([]);
  const [currEvent, setCurrEvent] = useState([]);
  const [radius, setRadius] = useState();
console.log(DirectionsRenderer)
console.log(DirectionsService)
const navigate = useNavigate();
function handleCreateBroadcast(event){
  event.preventDefault();
  let params = {"event_id": currEvent.id, "user_id": 1, "title": currEvent.name?.replaceAll(' ', '_').trim(), "about": currEvent.info?.replace(' ', '_').trim()}
  console.log(params)
  axios
  .post(`${process.env.REACT_APP_BACKEND_URL}/broadcasts/make-request`, params)
  .then((response) => {
    console.log(response.data);

  navigate(`/video/${response.data.room_codes['organizer-mobile']}`);
    
  })
  .catch((error) => {
    console.error('Error:', error);
  });
}


// useEffect
function onViewBroadcast(broadcast){
    setSettings({...settings, "firstname": "Mitsurugi", "lastname": "Mitsurugi", "roomCode": broadcast.room_codes.moderator, "roomType": "Moderator"})

    console.log(settings)
}
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/broadcasts?id=${id}`)
          .then((response) => {
            setBroadcasts(response.data);
          })
          .catch((error) => {
            console.error('Error fetching data:', error);
          });
      }, []);
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
      
      
    const {start, end, is_between} = formatDateRange(currEvent.start_date, currEvent.end_date);
      useEffect( () => {
        console.log('radius:', radius)
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/events/one`, {
            params: {
              latitude: settings.lat || 23,
              longitude: settings.lng || 23,
              'id':id
            },
    
          })
          .then(response => {
            console.log('settings: ', settings)
            console.log(response.data)
            setCurrEvent(response.data)
          })
          .catch(error => {
            console.error("Error: ", error);
    
            throw error;
          });
    }, [settings.radius, settings.lat, settings.lng])

    return(
    <>
        <div className="container-fluid p-0 m-0">
            <div className="row bg-light bg-gradient w-100 m-0 p-4 border-bottom border-secondary border-2">
                <div className="col-auto">
                    <h2 className="m-0 p-0"><strong>{currEvent.name}</strong></h2>
                    <h4>{currEvent.info}</h4>
                </div>

    {/* Create a separate component for just ID/avatar */}
                <div className="row mb-1"> 
                    <div className="col-sm">
                        <div className="row">
                            <div className="col-auto"> 
                                <img
        src={"https://xsgames.co/randomusers/avatar.php?g=female"}
        className="rounded-circle mt-2 align-middle border border-2 border-info"
        alt="Avatar"
        id="ImageDropdownToggle"
        data-bs-toggle="dropdown" 
        style={{width:"60px", height:"60px"}}
      />
      </div><div className="col"><div className="row mt-2">Firstname Lastname</div> <div className="row mt-1">Organization</div></div></div></div>
      </div>
    </div>
            <div className="row bg-gradient w-100 h-50 ShowPage_SideMargin">
                <div className="col-xl m-0 p-0"><img className="object-fit-cover ShowPage__TopMargin p-0 w-100 bg-gradient ShowPage_Image" src={currEvent.picture}  alt="" style={{width: "48%"}}/>
                <img className="m-0  p-0 bg-gradient ShowPage_Image ShowPage_GoogleImages" src={`https://maps.googleapis.com/maps/api/streetview?size=400x400&location=${currEvent.lat},${currEvent.lng}
&fov=80&heading=70&pitch=0&key=${process.env.REACT_APP_GOOGLE_API_KEY}`}  alt="" /> <img className="m-0 p-0 bg-gradient ShowPage_Image ShowPage_GoogleImages" src={`https://maps.googleapis.com/maps/api/staticmap?center=${currEvent.lat},${currEvent.lng}&zoom=12&size=400x400&maptype=roadmap&key=${process.env.NEXT_PUBLIC_MAP_API_KEY}`}  alt="" />
                </div>
                <div className="col-sm p-0 ShowPage__TopMargin">                
                <div className="card text-center shadow ShowPage__Information h-auto">
                    <div className="card-body">
                        <h5 className="card-title"><strong>Where to go?</strong></h5>
                        {/* <h6 className="card-subtitle mb-2 text-body-secondary">Time</h6> */}
                        <p className="card-text"> 
                             <ul className="list-group list-group-flush">
                                <li className="list-group-item">{currEvent.address?.replace('-undefined', '')}</li>
                                <li className="list-group-item">{start} <br></br>
                                 {end}</li>
                                <li className="list-group-item">{currEvent.distance_miles?.toFixed(4)} mi away</li>
                            </ul>
                        </p>
                    </div>
                    </div>

                    <div className="card text-center shadow ShowPage__Information h-auto">
                    <div className="card-body">
                        <h5 className="card-title"><strong>About this Event</strong></h5>
                        <p className="card-text">{currEvent.about}</p>
                    </div>
                    </div>
                    <div className="card text-center shadow ShowPage__Information h-auto">
                    <div className="card-body">
                        <h5 className="card-title"><strong>{is_between? "This event is ongoing!" : "This isn't currently happn"}</strong></h5>
                        <h6 className="card-subtitle mb-2 text-body-secondary">{currEvent.distance_miles > 0.5 ? "...But you're too far away" : "...and you're ready to get started!"}</h6>
                        <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        <form onSubmit={handleCreateBroadcast}>
                        <div className="btn-group shadow" role="group" aria-label="Basic mixed styles example">
                        {currEvent.distance_miles < 0.5 ? (
  <button type="submit" className="btn btn-danger" ><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-geo-alt-fill" viewBox="0 0 16 16">
  <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/>
</svg> Check-In</button>
) : (
  <button type="button" className="btn btn-danger" disabled><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-geo-alt-fill" viewBox="0 0 16 16">
  <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/>
</svg> View Broadcasts.</button>

)}

  <button type="button" className="btn btn-warning"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-fill" viewBox="0 0 16 16">
  <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
</svg> Review</button>
  <button type="button" className="btn btn-success"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-clock-history" viewBox="0 0 16 16">
  <path d="M8.515 1.019A7 7 0 0 0 8 1V0a8 8 0 0 1 .589.022l-.074.997zm2.004.45a7.003 7.003 0 0 0-.985-.299l.219-.976c.383.086.76.2 1.126.342l-.36.933zm1.37.71a7.01 7.01 0 0 0-.439-.27l.493-.87a8.025 8.025 0 0 1 .979.654l-.615.789a6.996 6.996 0 0 0-.418-.302zm1.834 1.79a6.99 6.99 0 0 0-.653-.796l.724-.69c.27.285.52.59.747.91l-.818.576zm.744 1.352a7.08 7.08 0 0 0-.214-.468l.893-.45a7.976 7.976 0 0 1 .45 1.088l-.95.313a7.023 7.023 0 0 0-.179-.483zm.53 2.507a6.991 6.991 0 0 0-.1-1.025l.985-.17c.067.386.106.778.116 1.17l-1 .025zm-.131 1.538c.033-.17.06-.339.081-.51l.993.123a7.957 7.957 0 0 1-.23 1.155l-.964-.267c.046-.165.086-.332.12-.501zm-.952 2.379c.184-.29.346-.594.486-.908l.914.405c-.16.36-.345.706-.555 1.038l-.845-.535zm-.964 1.205c.122-.122.239-.248.35-.378l.758.653a8.073 8.073 0 0 1-.401.432l-.707-.707z"/>
  <path d="M8 1a7 7 0 1 0 4.95 11.95l.707.707A8.001 8.001 0 1 1 8 0v1z"/>
  <path d="M7.5 3a.5.5 0 0 1 .5.5v5.21l3.248 1.856a.5.5 0 0 1-.496.868l-3.5-2A.5.5 0 0 1 7 9V3.5a.5.5 0 0 1 .5-.5z"/>
</svg> View History</button>
</div>
</form>
                    </div>
                    </div>
                </div>
  




</div>

<Wrapper apiKey={process.env.REACT_APP_GOOGLE_API_KEY}><div className="bg-light h-50 w-100"><DirectionsMap lat={settings.lat} lng={settings.lng} setRadius={setRadius} /></div>  </Wrapper>

    </div>
<div className="row">
  <div className="col-2">
   { broadcasts && broadcasts.map(broadcast =>{ 
    const dateString = broadcast.created_at;
    const date = new Date(dateString);
    
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); 
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    
    const formattedDate = `${year}-${month}-${day}`;
    const formattedTime = `${hours}:${minutes}:${seconds}`;
    
    return (
<div className="col-3"> 
<div className="card shadow-lg p-0 m-0 h-auto">
<div className="container p-0 m-0 card-body">
  <div className="row px-3 my-1 mt-3"><h5 className="card-title fw-bold">{broadcast.title}</h5></div>
  <div className="border-top border-info border-2 mt-0 pt-0 ms-3 me-5"> </div>
  <div className="row px-4 mt-1"><div className="col-auto"><p className="card-text">{broadcast.about}</p></div> </div>
  <div className="row px-3 mb-3 mt-2"> <div className="col"><div className="row"><div className="col-3"> <img
        src="https://xsgames.co/randomusers/avatar.php?g=female"
        className="rounded-circle mt-2 img-fluid align-middle border border-2 border-info"
        alt="Avatar"
        id="ImageDropdownToggle"
        data-bs-toggle="dropdown" 
      /></div><div className="col-auto"><div className="row mt-2">Firstname Lastname</div> <div className="row mt-1">Organization</div></div></div></div> <div className="col-3"> <Link to="/video"><span className="btn mt-3 btn-info me-3 align-middle text-white" onClick={() =>onViewBroadcast(broadcast)}>View</span></Link></div></div>
  <div className="card-footer">
    Created on: {formattedDate} at {formattedTime}
  </div>
  
</div>
</div>
</div>)})}</div></div>

    </>
    )
}
