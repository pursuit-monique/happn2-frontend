// import { storage } from "../firebase/firebase";
// import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useRef, useEffect, useState } from "react";
import axios from "axios";
// import { v4 } from "uuid";
// import { useNavigate } from "react-router-dom";

export default function NewEvent(){
    const autoCompleteRef = useRef();
    const inputRef = useRef();
    const [value, setValue] = useState(null);
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [event, setEvent] = useState({
      cause_id: "",
      title: "",
      description: "",
      date: "",
      time: "",
      category: "",
    });

    const options = {
      componentRestrictions: { country: "us", state: "New York" },
      fields: ["address_components", "geometry", "icon", "name"],
    };
    useEffect(() => {
      autoCompleteRef.current = new window.google.maps.places.Autocomplete(
        inputRef.current,
        options
      );
      autoCompleteRef.current.addListener("place_changed", async function () {
        const place = await autoCompleteRef.current.getPlace();
        console.log({ place });
      });
      // console.log(autoCompleteRef.current);
    });
  
    const today = new Date();
    const todayFormatted = new Date().toISOString().substr(0, 19);
  
    const maxDate = new Date(today.getTime() + 2629800000)
      .toISOString()
      .substr(0, 19);

      return (
        <>
              <div className="form_container align-self-center">
        <div class="card border-0 shadow-lg m-4" style={{ width: "100%" }}>
          <div class="card-body">
            <h3 class="card-title">
              {" "}
              <strong>Submit a New Event </strong>
            </h3>
            <hr class="border border-info border opacity-75" />
            <p class="card-text">
              <div class="mb-3">
                <label for="title" class="form-label">
                  <strong>Title</strong>
                </label>
                <input
                  type="text"
                  class="form-control focus-ring focus-ring-info py-1 px-2 text-decoration-none border rounded-2"
                  id="title"
                  placeholder="Event title"
                />
              </div>
              <div class="mb-3">
                <label for="img" class="form-label">
                  <strong>Upload Event Image</strong>
                </label>
                <input
                  class="form-control focus-ring focus-ring-info py-1 px-2 text-decoration-none border rounded-2"
                  type="file"
                  id="img"
                />
              </div>

              <div className="row g-auto my-3 justify-content-between">
                <div className="col-7">
                  <label for="summary" class="form-label">
                    <strong>Summary</strong>
                  </label>
                  <input
                    type="text"
                    class="form-control focus-ring focus-ring-info  text-decoration-none border rounded-2"
                    id="summary"
                    placeholder="Summary"
                  />
                </div>
                <div className="col-auto">
                  <label for="cause" class="form-label">
                    <strong>Cause</strong>
                  </label>
                  <select
                    class="form-select form-control focus-ring focus-ring-info text-decoration-none border rounded-2"
                    aria-label="Default select example"
                    id="cause"
                  >
                    <option selected>Open this select menu</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
                </div>
              </div>
              <label for="description" class="form-label my-2">
                <strong>Description</strong>
              </label>
              <textarea
                type="text"
                class="form-control focus-ring focus-ring-info py-1 px-2 text-decoration-none border rounded-2"
                id="description"
                placeholder="Describe the event"
              />
              <div className="row justify-content-between g-auto">
                <div className="col-auto mb-2">
                  <label for="event-start" class="form-label my-3">
                    <strong>Event Start Time:</strong>
                  </label>
                  <input
                    type="datetime-local"
                    class="form-control focus-ring focus-ring-info py-1 px-2 text-decoration-none border rounded-2 btn-info"
                    id="event-start"
                    value={todayFormatted}
                    min={todayFormatted}
                    max={maxDate}
                  />
                </div>
                <div className="col-auto mb-2">
                  <label for="event-end" class="form-label my-3">
                    <strong>Event End Time:</strong>
                  </label>
                  <input
                    type="datetime-local"
                    class="form-control focus-ring focus-ring-info py-1 px-2 text-decoration-none border rounded-2 btn-info"
                    id="event-end"
                    value={today}
                  />
                </div>
              </div>
              <label for="address" class="form-label my-2">
                <strong>Address</strong>
              </label>
              <input
                type="text"
                class="form-control focus-ring focus-ring-info py-1 px-2 text-decoration-none border rounded-2"
                id="address"
                placeholder="e.g 123 Springfield Rd."
                ref={inputRef}
              />
            </p>
            <div className="row justify-content-end g-2 my-3">
              <div className="col-auto">
                {" "}
                <button class="btn btn-info text-white">
                  <strong>Submit</strong>
                </button>{" "}
              </div>
              <div className="col-auto">
                <button class="btn btn-danger mx-2 text-white">
                  <strong>Reset</strong>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
        </>
      )
}