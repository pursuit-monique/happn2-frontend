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
        <h5 className="card-title">{currID.id.name}</h5>
        <p className="card-text overflow-y-scroll" style={{maxHeight: "64px"}}>{currID.id.about}</p>
        <p className="card-text"><small className="text-body-secondary">{currID.id.f_name} {currID.id.l_name} </small></p>
      </div><div className="m-2">
      {currID.id.tags.toLowerCase().replace(/[{}]/g, '').split(',').map(tag => <span class="badge m-1 text-bg-dark">{tag.split('_').join(' ')}</span>)}
      </div>
    </div>
    <div className="col-md-5 p-0 m-0">
      <img src={currID.id.picture} className="img-fluid object-fit-cover rounded-end h-100 p-0 m-0" alt="..." />
    </div>
  </div>
</div>
</div>

        : null}
        </>
    )
}

export default EventCards;