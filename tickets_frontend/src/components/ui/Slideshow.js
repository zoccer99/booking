import Carousel from "react-bootstrap/Carousel";
import allianzArena from "../../assets/pictures/allianz_arena.jpg";
import field from "../../assets/pictures/field.jpg";
import balls from "../../assets/pictures/balls.jpg";

export const Slideshow = () => {
  return (
    <div className="d-flex justify-content-center my-3">
      <Carousel
        controls={false}
        indicators={false}
        interval={3000}
        className="w-75"
      >
        <Carousel.Item>
          <img className="d-block w-100" src={allianzArena} alt="First slide" />
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src={balls} alt="Second slide" />
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src={field} alt="Third slide" />
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default Slideshow;
