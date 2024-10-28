import Carousel from "react-bootstrap/Carousel";
import Image1 from "../../../assets/images/item.jpg";
import Image2 from "../../../assets/images/slider_1.jpg";
import Image3 from "../../../assets/images/slider_2.jpg";

function TourCarousel() {
  return (
    <div className="">
      <div className="position-relative">
        <Carousel interval={2000}>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={Image1}
              alt="Slide 1"
              style={{ height: "400px", objectFit: "cover" }}
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={Image2}
              alt="Slide 2"
              style={{ height: "400px", objectFit: "cover" }}
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={Image3}
              alt="Slide 3"
              style={{ height: "400px", objectFit: "cover" }}
            />
          </Carousel.Item>
        </Carousel>

        <div className="d-flex mt-2">
          <img
            src={Image1}
            alt="Thumbnail 1"
            className="img-thumbnail me-2"
            style={{ width: "80px", height: "60px", objectFit: "cover" }}
          />
          <img
            src={Image2}
            alt="Thumbnail 2"
            className="img-thumbnail me-2"
            style={{ width: "80px", height: "60px", objectFit: "cover" }}
          />
          <img
            src={Image3}
            alt="Thumbnail 3"
            className="img-thumbnail me-2"
            style={{ width: "80px", height: "60px", objectFit: "cover" }}
          />
        </div>
      </div>
    </div>
  );
}

export default TourCarousel;
