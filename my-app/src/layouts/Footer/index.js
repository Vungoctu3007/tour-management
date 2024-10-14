import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-dark text-white py-4">
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-4 mb-4">
            <h5>Về Tour</h5>
            <p>
            Chúng tôi là công ty cam kết mang lại những dịch vụ 
            tốt nhất cho khách hàng. Tìm hiểu thêm về hành trình và giá trị của chúng tôi.
            </p>
          </div>
          <div className="col-12 col-md-4 mb-4">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li>
                <Link href="#" className="text-white">
                  Trang Chủ
                </Link>
              </li>
              <li>
                <Link href="#" className="text-white">
                  Dịch Vụ
                </Link>
              </li>
              <li>
                <Link href="#" className="text-white">
                  Tương Tác
                </Link>
              </li>
              <li>
                <Link href="#" className="text-white">
                  Chính Sách
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-12 col-md-4 mb-4">
            <h5>Kết nối với chúng tôi</h5>
            <p>
              123 Main St,
              <br />
              HCM, VN
              <br />
              Email: tour@company.com
              <br />
              Phone: +123 456 7890
            </p>
          </div>
        </div>
        <div className="text-center mt-4">
          <p>&copy; 2024 Service Tour. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
