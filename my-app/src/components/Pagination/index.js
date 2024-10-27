import { Link } from "react-router-dom";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
function Pagination() {
  return (
    <nav className="d-flex justify-content-center" aria-label="Page navigation example">
      <ul className="pagination">
        <li className="page-item">
          <Link className="page-link" href="#" aria-label="Previous">
          <ArrowBackIosIcon/>
          </Link>
        </li>
        <li className="page-item">
          <Link className="page-link" href="#">
            1
          </Link>
        </li>
        <li className="page-item">
          <Link className="page-link" href="#">
            2
          </Link>
        </li>
        <li className="page-item">
          <Link className="page-link" href="#">
            3
          </Link>
        </li>
        <li className="page-item">
          <Link className="page-link" href="#" aria-label="Next">
           <ArrowForwardIosIcon/>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Pagination;
