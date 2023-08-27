import './Card.css';
export default function Card(){
    return (

        <>

        <div class='marker bg-light rounded-4 shadow'> 
<div className="marker__background-image text-end bg-primary" 
style={{backgroundImage: 'url(https://xsgames.co/randomusers/avatar.php?g=female)'}}

><h4 class="text-light fw-bold mx-auto align-right p-3">Title of event</h4> </div>

    <div class=""></div>
    
<img src="https://xsgames.co/randomusers/avatar.php?g=female" class="" alt="marker" style={{width: "50px", height: "50px"}}/>
        </div>

        <div class="event-container">
  <div class="event-background"></div>
  <div class="event-content">
    <h4>Event Title</h4>
    <em>Today at Time</em>
    <p class="event-description">One sentence description of the event.</p>
  </div>
  <div class="avatar__container">
  <div class="avatar rounded-circle">
    <img src="https://xsgames.co/randomusers/avatar.php?g=female" class= "rounded-circle" alt="Avatar"  />
  </div>
  </div>
</div>
        </>
  )
}