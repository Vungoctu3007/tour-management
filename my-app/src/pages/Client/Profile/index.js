import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Image from "../../../assets/images/item.jpg";
const list = [
  {
    id: 1,
    image: Image,
    title: "singapore",
    tourCount: 1,
  },
  {
    id: 2,
    image: Image,
    title: "pari",
    tourCount: 1,
  },
  {
    id: 3,
    image: Image,
    title: "iland",
    tourCount: 1,
  },
  {
    id: 4,
    image: Image,
    title: "bangkok",
    tourCount: 1,
  },
];
function Profile() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const renderImageWithText = (imageSrc, altText, title, subtitle) => (
    <div className="" style={{ position: "relative" }}>
      <img
        src={imageSrc}
        alt={altText}
        className="img-fluid"
        style={{
          borderRadius: "10px",
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />
      {/* Text overlay */}
      <div
        style={{
          position: "absolute",
          bottom: "20px",
          left: "20px",
          color: "white",
          textShadow: "2px 2px 4px rgba(0, 0, 0, 0.7)",
        }}
      >
        <h2 className="h4 h-sm3 h-md2 h-lg1">{title}</h2>
        <p style={{ fontSize: "1rem" }}>{subtitle} tour</p>
      </div>
    </div>
  );

  return (
    <div>
      <h1>Profile</h1>
      <div>
        <h1>Profile</h1>
        <div className="container">
          <div className="row" style={{ height: "100%" }}>
            <div className="col-7 mb-3 d-flex align-items-stretch">
              {renderImageWithText(
                Image,
                list[0].image,
                list[0].title,
                list[0].tourCount
              )}
            </div>
            <div className="col-5 d-flex flex-column">
              <div className="row">
                <div className="col-12 mb-3">
                  {renderImageWithText(
                    Image,
                    list[1].image,
                    list[1].title,
                    list[1].tourCount
                  )}
                </div>
              </div>
              <div className="row flex-grow-1">
                {list.slice(2).map((item, index) => (
                  <div className="col-lg-6 mb-3">
                    {renderImageWithText(
                      item.image,
                      item.image,
                      item.title,
                      item.tourCount
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
