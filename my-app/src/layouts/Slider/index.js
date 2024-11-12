import Carousel from "react-bootstrap/Carousel";
import Image1 from "../../assets/images/item.jpg";
import Image2 from "../../assets/images/slider_1.jpg";
import Image3 from "../../assets/images/slider_2.jpg";
import styles from "./Slider.module.css"
function Slider() {
  return (
   
    <div className="position-relative d-block w-100 ">
      <Carousel interval={2000} controls={false}>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={Image1}
            alt="Slide 1"
            style={{ height: "475px", objectFit: "cover" }}
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={Image2}
            alt="Slide 2"
            style={{ height: "475px", objectFit: "cover" }}
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={Image3}
            alt="Slide 3"
            style={{ height: "475px", objectFit: "cover" }}
          />
        </Carousel.Item>
      </Carousel>
   
      <div
        className={`position-absolute top-50 start-50 w-100 ${styles.searchcarousel}`}
      >
      
      </div>
    </div>
  );
}

export default Slider;
