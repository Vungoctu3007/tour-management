import TourItem from "../TourItem";
import Favourite from "../Favourite";
function Content() {
  return (<div>
    <TourItem isInsideCol={false} />
    <Favourite></Favourite>
  </div>)
}

export default Content;
