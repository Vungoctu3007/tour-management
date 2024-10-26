import { Link } from "react-router-dom";
import { useState } from "react";
import sidebar_items from "../../constants/sidebar_items";
import styles from "./AdminSidebar.module.css";
import CircleIcon from '@mui/icons-material/Circle';
function AdminSidebar() {
  const [activeIndex, setActiveIndex] = useState(null);
  const handleToggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const renderSubItems = (subItems, isOpen) => {
    return (
      <ul 
        className={`nav flex-column ms-4 ${styles.submenu} ${isOpen ? styles['submenu-open'] : ''}`}
      >
        {subItems.map((subItem, index) => (
          <li key={index} className={styles.submenuItem}>
            <Link to={subItem.to} className={`nav-link text-dark ${styles.submenuLink}`}>
            <CircleIcon style={{ fontSize: '10px' ,marginRight:"10px"}}/>
              {subItem.title}
            </Link>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className={`d-flex flex-column bg-light ${styles.sidebar}`} style={{ maxHeight: "100vh", overflow: "auto" }}>
      <div className="mb-4">logo</div>

      <ul className="nav nav-pills flex-column mb-auto">
        {sidebar_items.map((item, index) => (
          <li className="nav-item" key={index}>
            <div onClick={() => handleToggle(index)} className="d-flex justify-content-between align-items-center" style={{ cursor: "pointer" }}>
              <Link to={item.to} className={`nav-link text-dark ${styles.menuLink}`}>
                <span style={{ marginRight: "10px" }}>{item.icon}</span>
                {item.title}
              </Link>
              {item.iconUp && (
                <span
                  style={{
                    transition: "transform 0.6s",
                    transform: activeIndex === index ? "rotate(180deg)" : "rotate(0deg)",
                  }}
                >
                  {item.iconUp}
                </span>
              )}
            </div>
            {item.item && activeIndex === index && renderSubItems(item.item, activeIndex === index)}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminSidebar;
