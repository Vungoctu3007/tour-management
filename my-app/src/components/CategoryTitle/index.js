import { Link,useLocation  } from "react-router-dom";

function CategoryTitle() {
  const location = useLocation();
  const pathSegments = location.pathname.split('/').filter(segment => segment);
    return (
      <div>
        <ul className="d-flex list-unstyled">
          <li className="me-2">
            <Link to="/" className="text-decoration-none">Trang Chủ</Link>
          </li>
          <li className="me-2">/</li>
          <li>
            {pathSegments}
          </li>
        </ul>
      </div>
    );
  }
  
  export default CategoryTitle;
  