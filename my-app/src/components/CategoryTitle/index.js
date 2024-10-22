import { Link } from "react-router-dom";

function CategoryTitle() {
    return (
      <div>
        <ul className="d-flex list-unstyled">
          <li className="me-2">
            <Link to="/" className="text-decoration-none">Trang Chủ</Link>
          </li>
          <li className="me-2">/</li>
          <li>Đặt Tour</li>
        </ul>
      </div>
    );
  }
  
  export default CategoryTitle;
  