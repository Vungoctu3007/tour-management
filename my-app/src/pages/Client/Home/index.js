import Slider from "../../../layouts/Slider";
import Favourite from "../../../components/Favourite";
import TourList from "../../../components/Tour/TourList";
function Home() {
  return (
    <div className="">
      <Slider></Slider>
      Home
      <div className="container ">
        <div className="row">
          <div className="">
            <TourList isShowPagination={false}/>
            <div className="mt-4">
              <Favourite />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
