import Slider from "../../../layouts/Slider";
import Content from "../../../components/Content";
const contentArray = Array.from({ length: 6 });

function Home() {
  return (
    <div className="">
      <Slider></Slider>
      Home
      <div className="container ">
        <div className="row">
          {contentArray.map((_, index) => (
            <div className="col-12 col-sm-6 col-md-4 mb-4" key={index}>
              <Content />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
