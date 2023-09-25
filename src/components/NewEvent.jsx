
import { useRef, useEffect, useState } from "react";
import axios from "axios";

import {
  ref,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";


import { storage } from "../firebase/firebase";
import { v4 } from "uuid";

// import 'firebase/storage'; 


export default function NewEvent(){
  const backend = process.env.REACT_APP_BACKEND_URL;
    const autoCompleteRef = useRef();
    const inputRef = useRef();
    const [loading, setLoading] = useState(false);
    const [formValid, setFormValid] = useState(false);
    const [response, setResponse] = useState(null);
    const imageUpload = useRef(null);


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
      locale_info: "",
      tags: ""
    });

    const handleFileChange = (e) => {
      imageUpload.current = e.target.files[0];
      console.log(imageUpload);
    };

    async function handleUpload() {
      if (!imageUpload.current) {
        console.log("No file selected");
        return;
      }
    
      const storageRef = ref(storage, `${imageUpload.current.name + v4()}`);
    
      try {
        // Upload the file and wait for the upload to complete
        const snapshot = await uploadBytes(storageRef, imageUpload.current);
        
        // Get the download URL and set the picture state
        const url = await getDownloadURL(snapshot.ref);
        return url;
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }

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
      fields: ["address_components", "geometry", "name", "place_id", "type"],
    };

    useEffect(() => {
      // This function will be called when the Google Maps script is loaded
      const handleScriptLoad = () => {
        // Initialize the Google Maps Places Autocomplete
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
            'locale_info': place.place_id,
            'tags': [place.name, ...place.types]
          }));
        });
      } ;
  
      const scriptUrl = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_API_KEY}&libraries=places&callback=initMap`;
  
      // Dynamically load the Google Maps API script
      const script = document.createElement('script');
      script.src = scriptUrl;
      script.async = true;
      script.onload = handleScriptLoad;
      document.body.appendChild(script);
  
      // Clean up by removing the script when the component unmounts
      return () => {
        document.body.removeChild(script);
      };
    }, []);


    async function handleSubmit(event) {
      event.preventDefault();
      setLoading(true);
    
      if (formValid) {
        try {
          handleUpload().then((res) =>{
    

            axios.post(`${backend}/events`, { ...currEvent, 'picture': res }).then(dbres => {

            console.log(dbres.data);
            setResponse(dbres.data);
            setLoading(false);
            })
    
        })
        } catch (error) {
          console.error(error);
          setLoading(false);
        }
      } else {
        console.log("Form is not valid. Cannot submit.");
        setLoading(false);
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
              <div className="row form_container align-self-center form_margin">
        <div className="col-sm border-0 shadow-lg bg-light rounded-4 form_padding" style={{height: "auto"}}>
          <div>
            <h3 className="card-title ps-2">
              {" "}
              <strong>Submit a New Event </strong>
            </h3>
            <hr className="border border-info border opacity-75" />
            <p className="card-text ps-2">
              <div className="mb-3">
                <label for="title" className="form-label">
                  <strong>Title</strong>
                </label>
                <input
                  type="text"
                  className="form-control focus-ring focus-ring-info py-1 px-2 text-decoration-none border rounded-2"
                  id="name"
                  placeholder="Event title"
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label for="img" className="form-label">
                  <strong>Upload Event Image</strong>
                </label>
                <input
                  className="form-control focus-ring focus-ring-info py-1 px-2 text-decoration-none border rounded-2"
                  type="file"
                  id="picture"
                  onChange={handleFileChange}
                />
              </div>

              <div className="row g-auto my-3 justify-content-between">
                <div className="col-7">
                  <label for="summary" className="form-label">
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
                <div className="col-sm">
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
                <div className="col-sm mb-2">
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
        <div className="col-auto">
          {/* <div className="row-1 card-title bg-primary"></div> */}
          {response?.judgement ? 
          <div class="card text-center h-auto form_margin form_padding">
          <div class="card-header bg-primary text-light">
            Event did not submit
          </div>
          <div class="card-body">
            <h5 class="card-title">Your Event has been Denied.</h5>
            <p class="card-text">{response.response}</p>
            <button class="btn btn-primary text-light" type="submit">Reset</button>
          </div>

        </div> : null }



        </div>
      </div>
      </form>

        </>
      )
}