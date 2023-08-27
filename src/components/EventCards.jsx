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
        {currID ? <div class="col-xs-12 col-sm-4 EventCards">
            <div class="card" style={{background: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.2)), url(${currID.id.img_link})`}}>
              <div class="card-category">Locale Name</div>
              <div class="card-description">
                <h2>{currID.id.title}</h2>
                <p>{currID.id.f_name} {currID.id.l_name}</p>
              </div>
              {/* <img class="card-user avatar avatar-large" src={currID.id.img_link} /> */}
              <a class="card-link" href="#" ></a>
            </div>
          </div> : null}
        </>
    )
}

export default EventCards;