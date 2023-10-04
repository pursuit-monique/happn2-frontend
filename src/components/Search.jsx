import React from "react";
import "./Search.css";

function Search({ search, setSearch }) {

  const handleInputChange = (event) => {
    // Update the search state with the new value from the input
    setSearch(event.target.value.toLowerCase());
  };

  return (
    <div className="input-group mb-3 position-relative position-absolute top-0 start-0 Search__padding">
        {/* <div class="input-group mb-3"> */}
  <div class="input-group-text bg-dark text-light">
    <label for="previous fs-6">Only Current:  </label>
            <input class="form-check-input mt-0" name='previous' type="checkbox" value="" aria-label="Checkbox for following text input" /> 
            </div>
      <input
        type="text"
        className="form-control focus-ring focus-ring-warning"
        placeholder="Search for Event Type"
        aria-label="Recipient's username"
        aria-describedby="button-addon2"
        value={search} // Input value is controlled by the 'search' prop
        onChange={handleInputChange} // Update state when input changes
      />
      {/* <button className="btn btn-light" type="button" id="button-addon2">
        Search
      </button> */}
    </div>
  );
}

export default Search;
