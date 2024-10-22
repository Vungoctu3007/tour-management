import { Fragment } from "react";
import { Link } from "react-router-dom";
import profile_items from "../../constants/profileItems";
function ProfileItem({isClass, width="310px"}) {
  const cla=isClass ? "profile " : "profile";
  return (
    <div style={{ width }} className={isClass ?"border rounded":""}>
      <span
        className={`d-block text-center ${isClass ? "mt-0":""}`}
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
            
            <li className={`${isClass ? "p-3" : ""} fw-bold`}>
              <Link className="dropdown-item fw-bold" to={item.to}>
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
