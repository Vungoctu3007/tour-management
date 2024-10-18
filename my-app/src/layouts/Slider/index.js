import ImageSlider from "../../assets/images/slider_2.jpg";
import SearchInput from "../../components/Search/searchInput";

function Slider() {
  return (
    <div
      className="d-block w-100 img-fluid d-flex justify-content-center align-items-center"
      style={{
        height: "475px",
        backgroundImage: `url(${ImageSlider})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <div className="w-100 d-flex justify-content-center ">
        <SearchInput className="" a={true} b={true}/>
      </div>
    </div>
  
  );
}

export default Slider;
