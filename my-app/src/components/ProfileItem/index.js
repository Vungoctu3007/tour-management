import { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import profile_items from "../../constants/profileItems";
function ProfileItem({ isClass, width = "310px" }) {
  const [activeIndex, setActiveIndex] = useState(isClass ? 0 :-1);
  const handleClickActiveIndex = (index) => {
    if(isClass){
      setActiveIndex(index);
    }
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
        Hello User
      </span>
      <ul className="list-unstyled ">
        {profile_items.map((item, index) => (
          <Fragment key={index}>
            {index === profile_items.length - 1 && (
              <li>
                <hr className="dropdown-divider" />
              </li>
            )}

            <li
              className=" fw-bold"
              onClick={() => handleClickActiveIndex(index)}
              style={{
                backgroundColor: activeIndex === index ? "#ccc" : "transparent",
                color: activeIndex === index ? "#fff" : "inherit", 
              }}
            >
              <Link className={`dropdown-item fw-bold ${isClass ? "p-3":""}`} to={item.to}>
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
