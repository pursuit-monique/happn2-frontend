import { useState, useEffect } from "react";

import "./EventCards.css";
import { tempData } from "../helpers/Objects";

const EventCards= ({currID}) => {


   const [currentEvent, setEvent] = useState(currID ? tempData.filter( data => data.id === currID.id) : null);
   useEffect(() => {
    if (currID) setEvent(tempData.filter( data => data.id === currID.id));
    console.log(currentEvent);
    console.log(tempData);
    console.log(currID)
        }, [currID])
    return (
        <>
        {currID ? 
        <div className="EventCards">
        <div className="card mb-3 p-0 h-auto" style={{maxWidth: "540px"}}>
  <div className="row g-0">
    <div className="col-md-7">
      <div className="card-body">
        <h5 className="card-title">{currID.id.title}</h5>
        <p className="card-text overflow-y-scroll" style={{maxHeight: "64px"}}>This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
        <p className="card-text"><small className="text-body-secondary">{currID.id.f_name} {currID.id.l_name} </small></p>
      </div>
    </div>
    <div className="col-md-5 p-0 m-0">
      <img src={currID.id.img_link} className="img-fluid object-fit-cover rounded-end h-100 p-0 m-0" alt="..." />
    </div>
  </div>
</div>
</div>
        
        
        
        // <div class="col-xs-12 col-sm-4 EventCards">
        //     <div class="card" style={{background: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.2)), url(${currID.id.img_link})`}}>
        //       <div class="card-category">Locale Name</div>
        //       <div class="card-description">
        //         <h2>{currID.id.title}</h2>
        //         <p>{currID.id.f_name} {currID.id.l_name}</p>
        //       </div>
        //       {/* <img class="card-user avatar avatar-large" src={currID.id.img_link} /> */}
        //       <a class="card-link" href="#" ></a>
        //     </div>
        //   </div> 
        : null}
        </>
    )
}

export default EventCards;