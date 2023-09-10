import './NewButton.css';

import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';




const NewButton = () => {
    const [showModal, setShowModal] = useState(false);
  
    const handleCloseModal = () => {
      setShowModal(false);
    };
  
    const handleShowModal = () => {
      setShowModal(true);
    };
  
    return (
      <>
        <div className="NewButton">
          <span
            data-bs-toggle="tooltip"
            data-bs-title="Create New Event"
            onClick={handleShowModal}
          >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="64"
            height="64"
            fill="#F6F9F9"
            className="bi bi-plus"
            viewBox="0 0 16 16"
            style={{ cursor: 'pointer' }}
          >
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
          </svg>
        </span>
      </div>

      <Modal show={showModal} onHide={handleCloseModal} id="myModal" dialogClassName="custom-modal-dialog"
          contentClassName="custom-modal-content"
          backdropClassName="custom-modal-backdrop">
            <div className="align-self-center">
        <div class="card border-0 shadow-lg m-4" style={{ width: "50vw", height: "auto"}}>
          <div class="card-body">
          <div className="modal-header border-0 p-0 m-0">
        <h3 className="modal-title">
          <strong>Submit a New Event</strong>
        </h3>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="modal"
          aria-label="Close"
        ></button>
      </div>
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
      </Modal>
    
        </>
    )
}

export default NewButton;