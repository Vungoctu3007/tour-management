import { useState } from "react";

function Schedule({ detailRoute }) {
  const [visibleImage, setVisibleImage] = useState({});

  const handleToggleImage = (id) => {
    setVisibleImage((prev) => ({
      // ...prev,
      [id]: !prev[id], 
    }));
  };

  return (
    <div className="border rounded p-2">
      <h5>Chương trình tour</h5>
      <div
        className="accordion accordion-flush mt-4"
        id="accordionFlushExample"
      >
        {detailRoute.legs.map((item, index) => (
          <div className="accordion-item border rounded" key={index}>
            <div className="accordion-header">
              <div
                className="accordion-button collapsed"
                type="button"
                onClick={() => handleToggleImage(item.id)} 
                data-bs-toggle="collapse"
                data-bs-target={`#flush-collapse${item.id}`}
                aria-expanded="false"
                aria-controls={`flush-collapse${item.id}`}
              >
                <div className="w-100">
                  <div>
                    <div className="row">
                      <div className={`col-3 ${visibleImage[item.id] ? 'd-none' : ''}`}>
                        <img
                          src={require(`../../../assets/images/Tour/${item.textImage}`)}
                          style={{
                            width: "130px",
                            height: "70px",
                            objectFit: "cover",
                          }}
                          alt={item.textImage}
                        />
                      </div>
                      <div className="col-9">
                        <h5>Ngày {item.sequence}</h5>
                        <span>{item.title}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              id={`flush-collapse${item.id}`}
              className="accordion-collapse collapse"
              data-bs-parent="#accordionFlushExample"
            >
              <div className="accordion-body">
                {item.description}
                <img
                  alt=""
                  src={require(`../../../assets/images/Tour/${item.textImage}`)}
                  className="w-100"
                  style={{ height: "400px" }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default Schedule;
