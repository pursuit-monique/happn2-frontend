
import { useRef, useEffect, useState } from "react";
import axios from "axios";


export default function NewEvent(){
  const backend = process.env.REACT_APP_BACKEND_URL;
    const autoCompleteRef = useRef();
    const inputRef = useRef();
// TODO: loading logic
    const [loading, setLoading] = useState(false);
    const [formValid, setFormValid] = useState(false);
    const [response, setResponse] = useState(null);

    const [currEvent, setEvent] = useState({
      name: "",
      info: "",
      about: "",
      picture: "",
      start_date: "",
      end_date: "",
      address: "",
      lat: 0,
      lng: 0,
      organization_id: 1,
      cause_id: 1,
      type_id: 1,
      locale_info: "hnshsgsh",
      tags: ["2892898"]
    });

    function isFormValid(currEvent) {
      return (
        currEvent.name.trim() !== "" &&
        currEvent.info.trim() !== "" &&
        currEvent.about.trim() !== "" &&
        currEvent.address.trim() !== "" &&
        currEvent.start_date !== "" &&
        currEvent.end_date !== ""
      );
    }


  
    const options = {
      componentRestrictions: { country: "us"},
      fields: ["address_components", "geometry", "icon", "name"],
    };
    useEffect(() => {
      autoCompleteRef.current = new window.google.maps.places.Autocomplete(
        inputRef.current,
        options
      );
      autoCompleteRef.current.addListener("place_changed", function () {
        const place = autoCompleteRef.current.getPlace();
        console.log(place)
    
        setEvent((prevData) => ({
          ...prevData,
          address: `${place?.address_components[0].long_name} ${place?.address_components[1].long_name}, ${place.address_components[3].long_name === "Brooklyn" || place.address_components[3].long_name === "Bronx" || place.address_components[3].long_name === "Manhattan" ? place?.address_components[3].long_name : place?.address_components[2].long_name}, ${place?.address_components[5]?.short_name}. ${place?.address_components[7]?.short_name}-${place?.address_components[8]?.short_name}`,
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        }));
      });
    }, );

    // const today = new Date();
    // const todayFormatted = new Date().toISOString().substr(0, 19);
  
    // const maxDate = new Date(today.getTime() + 2629800000)
    //   .toISOString()
    //   .substr(0, 19);


      function handleSubmit(event) {
        event.preventDefault();
        setLoading(true);
        console.log(currEvent)
        if (formValid) {
          console.log("Backend URL:", backend);
          axios.post(`${backend}/events`, currEvent)
          .then((response) => {
            setResponse(response.data);
            setLoading(false);
          })
          .catch((error) => {
            console.error(error);
          });console.log("Form submitted!");
        } else {
          console.log("Form is not valid. Cannot submit.");
        }
            }

      function handleChange(event){
        const { id, value, type } = event.target;
        setEvent((prevData) => ({
          ...prevData,
          [id]: type === "file" ? event.target.files[0] : value,
        }));
  setFormValid(isFormValid({ ...currEvent, [id]: value }));
      }





      return (
        <>

        <form onSubmit={handleSubmit}>
              <div className="form_container row align-self-center">
        <div class="card col border-0 shadow-lg m-4" style={{ width: "100%", height: "auto" }}>
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
                  id="name"
                  placeholder="Event title"
                  onChange={handleChange}
                />
              </div>
              <div class="mb-3">
                <label for="img" class="form-label">
                  <strong>Upload Event Image</strong>
                </label>
                <input
                  class="form-control focus-ring focus-ring-info py-1 px-2 text-decoration-none border rounded-2"
                  type="file"
                  id="picture"
                  onChange={handleChange}
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
                    id="info"
                    placeholder="Summary"
                    onChange={handleChange}
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
                    onChange={handleChange}
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
                id="about"
                placeholder="Describe the event"
                onChange={handleChange}
              />
              <div className="row justify-content-between g-auto">
                <div className="col-auto mb-2">
                  <label for="event-start" class="form-label my-3">
                    <strong>Event Start Time:</strong>
                  </label>
                  <input
                    type="datetime-local"
                    class="form-control focus-ring focus-ring-info py-1 px-2 text-decoration-none border rounded-2 btn-info"
                    id="start_date"
                    value={currEvent.start_date}
                    // min={todayFormatted}
                    // max={maxDate}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-auto mb-2">
                  <label for="event-end" class="form-label my-3">
                    <strong>Event End Time:</strong>
                  </label>
                  <input
                    type="datetime-local"
                    class="form-control focus-ring focus-ring-info py-1 px-2 text-decoration-none border rounded-2 btn-info"
                    id="end_date"
                    value={currEvent.end_date}
                    onChange={handleChange}
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
                <button class="btn btn-info text-white" 
                disabled={!formValid}
                >
                  <strong>{ loading ? <span class="spinner-border-sm spinner-border text-light" role="status"></span> : null }  Submit</strong>
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
        <div className="col">
          {/* <div className="row-1 card-title bg-primary"></div> */}
          {response?.judgement ? 
          <div class="card text-center m-4">
          <div class="card-header bg-primary text-light">
            Event did not submit
          </div>
          <div class="card-body">
            <h5 class="card-title">Your Event has been Denied.</h5>
            <p class="card-text">{response.response}</p>
            <button class="btn btn-primary text-light" type="submit">Reset</button>
          </div>
          {/* <div class="card-footer text-body-secondary">
          
          </div> */}
        </div> : null }



        </div>
      </div>
      </form>
        </>
      )
}