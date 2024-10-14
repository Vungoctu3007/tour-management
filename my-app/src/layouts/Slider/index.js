import ImageSlider from "../../assets/images/slider_2.jpg";

function Slider() {
    // <img src={ImageSlider} className="d-block w-100 " alt="..." />
  return (
    <div id="carouselExampleIndicators" className="carousel slide">
   
    <div className="carousel-inner">
      <div className="carousel-item active">
        <img src={ImageSlider} className="d-block w-100 " alt="..." />
      </div>
      <div className="carousel-item">
        <img src={ImageSlider} className="d-block w-100 " alt="..." />
      </div>
      <div className="carousel-item">
        <img src={ImageSlider} className="d-block w-100 " alt="..." />
      </div>
    </div>
    
  </div>
  
  );
}

export default Slider;
