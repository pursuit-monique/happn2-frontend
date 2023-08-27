import "./NewsPanel.css"
import { Carousel } from 'react-bootstrap';

const NewsPanel = ({map}) => {
    return (
        <>
        {/* <div className="NewsPanel__container">
        <div className="w-25 bg-primary bg-gradient NewsPanel__header"><h3 className="NewsPanel__headline text-light">Breaking</h3></div>
        <div className="NewsPanel float-start border"> <h4 onClick={(event) => map.panTo({lat: 40, lng: 20}) }> Event Lets' Dance Party has begun!</h4></div>
        </div> */}
        <div style={{zIndex: 300, position: "absolute", bottom: "0", width: "100vw", pointerEvents: "none"}}>
        <Carousel interval={5000} pause={false} controls={false}>
        <Carousel.Item>
          <div
            className="d-block w-100"
            style={{ backgroundColor: "transparent", height: '200px', pointerEvents: "none" }}
          >
        <div className="NewsPanel__container">
        <div className="w-25 bg-primary bg-gradient NewsPanel__header"><h3 className="NewsPanel__headline text-light">Breaking</h3></div>
        <div className="NewsPanel float-start border"> <h4 style={{  pointerEvents: "initial" }}  onClick={(event) => map.panTo({lat: 40, lng: 20}) }> Event Lets' Dance Party has begun!</h4></div>
        </div>
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <div
            className="d-block w-100"
            style={{ backgroundColor: "transparent", height: '200px', pointerEvents: "none" }}
          >
        <div className="NewsPanel__container">
        <div className="w-25 bg-info bg-gradient NewsPanel__header"><h3 className="NewsPanel__headline text-light">Info</h3></div>
        <div className="NewsPanel float-start border"> <h4 style={{  pointerEvents: "initial" }}  onClick={(event) => map.panTo({lat: 40, lng: 20}) }> Marcia Foster has gone Live!</h4></div>
        </div>
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <div
            className="d-block w-100"
            style={{ backgroundColor: "transparent", height: '200px', pointerEvents: "none" }}
          >
        <div className="NewsPanel__container">
        <div className="w-25 bg-warning bg-gradient NewsPanel__header"><h3 className="NewsPanel__headline text-light">Warning!</h3></div>
        <div className="NewsPanel float-start border"> <h4 style={{  pointerEvents: "initial" }} onClick={(event) => map.panTo({lat: 40, lng: 20}) }> A riot has broke out!</h4></div>
        </div>
          </div>
        </Carousel.Item>
      </Carousel>
      </div>
        </>
    )
}

export default NewsPanel;