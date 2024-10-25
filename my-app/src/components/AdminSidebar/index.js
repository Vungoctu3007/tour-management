import { Link } from "react-router-dom";
import { useState } from "react";
import sidebar_items from "../../constants/sidebar_items"
import styles from "./AdminSidebar.module.css"


function AdminSidebar() {
  const [activeIndex, setActiveIndex] = useState(null);
  const handleToggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const renderSubItems = (subItems,isOpen) => {
    return (
    
      <ul 
      className={`nav flex-column ms-3 ${styles.submenu} ${isOpen ? styles['submenu-open'] : ''}`}
      >
        {subItems.map((subItem, index) => (
          <li key={index}>
            <Link to={subItem.to} className="nav-link text-dark">
              {subItem.title}
            </Link>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="d-flex flex-column  bg-light" style={{maxHeight:"100vh",overflow:"auto"}}>
      <div className="mb-4">logo</div>

      <ul className="nav nav-pills flex-column mb-auto">
        {sidebar_items.map((item, index) => (
          <li className="nav-item" key={index}>
            <div onClick={() => handleToggle(index)}  className="d-flex justify-content-between align-items-center" style={{cursor:"pointer"}}>
              <Link
                to={item.to}
                className="nav-link text-dark"
              >
                <span style={{ marginRight: "10px" }}>{item.icon}</span>
                {item.title}
              </Link>
              {/* icon up  */}
              {item.iconUp && (
                <span
                  style={{
                    transition: "transform 0.6s",
                    transform:
                      activeIndex === index ? "rotate(180deg)" : "rotate(0deg)",
                  }}
                  
                >
                  {item.iconUp}
                </span>
              )}
            </div>
            {item.item && activeIndex === index && renderSubItems(item.item,activeIndex===index)}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminSidebar;
