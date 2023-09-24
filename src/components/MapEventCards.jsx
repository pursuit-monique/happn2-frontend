const MapEventCards = () => {
return ( <div className="card mb-3 p-0 h-auto" style={{maxWidth: "540px"}}>
  <div className="row g-0">
    <div className="col-md-7">
      <div className="card-body">
        <h5 className="card-title">Card title</h5>
        <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
        <p className="card-text"><small className="text-body-secondary">Last updated 3 mins ago</small></p>
      </div>
    </div>
    <div className="col-md-5 p-0 m-0">
      <img src="https://xsgames.co/randomusers/avatar.php?g=female" className="img-fluid object-fit-cover rounded-end h-100 p-0 m-0" alt="..." />
    </div>
  </div>
</div>
)

}

export default MapEventCards;