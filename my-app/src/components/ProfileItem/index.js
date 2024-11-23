import { Fragment, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import profile_items from "../../constants/profileItems";

function ProfileItem({ isClass, width = "px" }) {
    const [activeIndex, setActiveIndex] = useState(isClass ? 0 : -1);
    const [username, setUsername] = useState(""); // Khởi tạo state cho username
    const navigate = useNavigate(); // Sử dụng hook navigate để điều hướng

    useEffect(() => {
        // Tải username từ localStorage khi component được mount
        const storedUsername = localStorage.getItem("username");
        console.log(storedUsername);
        if (storedUsername) {
            setUsername(storedUsername); // Cập nhật state với username từ localStorage
        }
    }, []);

    const handleClickActiveIndex = (index) => {
        if (isClass) {
            setActiveIndex(index);
        }

        // Kiểm tra nếu người dùng nhấn vào mục "Logout"
        if (profile_items[index].title === "Đăng Xuất") {
            handleLogout(); // Gọi hàm handleLogout khi người dùng chọn "Logout"
        }
    };

    const handleLogout = () => {
        // Xóa token và các thông tin đăng nhập khác khỏi localStorage
        localStorage.removeItem("token");
        localStorage.removeItem("roleId");
        localStorage.removeItem("username");
        localStorage.removeItem("userId")
        localStorage.removeItem("email")

        // Điều hướng đến trang đăng nhập
        navigate("/login");
    };

    return (
        <div style={{ width }} className={isClass ? "border rounded" : ""}>
            <span
                className={`d-block text-center ${isClass ? "mt-0" : ""}`}
                style={{
                    backgroundColor: "#e2803a",
                    padding: "10px",
                    marginTop: "-8px",
                    borderRadius: "4px 4px 0 0",
                }}
            >
                {username || "User"} 
            </span>
            <ul className="list-unstyled">
                {profile_items.map((item, index) => (
                    <Fragment key={index}>
                        {index === profile_items.length - 1 && (
                            <li>
                                <hr className="dropdown-divider" />
                            </li>
                        )}

                        <li
                            className="fw-bold"
                            onClick={() => handleClickActiveIndex(index)}
                            style={{
                                backgroundColor: activeIndex === index ? "#ccc" : "transparent",
                                color: activeIndex === index ? "#fff" : "inherit",
                            }}
                        >
                            <Link
                                className={`dropdown-item fw-bold ${isClass ? "p-3" : ""}`}
                                to={item.to}
                            >
                                <span className="me-3" style={{ color: "#259ed5" }}>
                                    {item.icon}
                                </span>
                                {item.title}
                            </Link>
                        </li>
                    </Fragment>
                ))}
            </ul>
        </div>
    );
}

export default ProfileItem;
