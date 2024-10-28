import Image from "../../../assets/images/item.jpg";
const schedule_items = [
  {
    id: 1,
    image: Image,
    sequence: "Ngày 1",
    title: "TP.HỒ CHÍ MINH - GIALAI",
    description: "Quý khách tập trung tại sân bay Tân Sơn Nhất, ",
  },
  {
    id: 2,
    image: Image,
    sequence: "Ngày 2",
    title: "TP.HỒ CHÍ MINH - GIALAI",
    description: "Quý khách tập trung tại sân bay Tân Sơn Nhất, ",
  },
  {
    id: 3,
    image: Image,
    sequence: "Ngày 3",
    title: "TP.HỒ CHÍ MINH - GIALAI",
    description: "Quý khách tập trung tại sân bay Tân Sơn Nhất, ",
  },
  {
    id: 4,
    image: Image,
    sequence: "Ngày 4",
    title: "TP.HỒ CHÍ MINH - GIALAI",
    description: "Quý khách tập trung tại sân bay Tân Sơn Nhất, ",
  },
];
function Schedule() {
  return (
    <div className="border rounded p-2">
      <h2>Chương trình tour</h2>
      <div className="accordion accordion-flush" id="accordionFlushExample">
        {schedule_items.map((item, index) => (
          <div className="accordion-item border rounded mt-4" key={item.id}>
            <div className="accordion-header">
              <div
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target={`#flush-collapse${item.id}`}
                aria-expanded="false"
                aria-controls={`flush-collapse${item.id}`}
              >
                <div className="w-100">
                  <div>
                    <div className="row">
                      <div className="col-3">
                        <img
                          src={item.image}
                          alt=""
                          style={{
                            width: "150px",
                            height: "100px",
                            objectFit: "cover",
                          }}
                        />
                      </div>
                      <div className="col-9">
                        <h5>{item.sequence}</h5>
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
                Placeholder content for this accordion, which is intended to
                demonstrate the <code>.accordion-flush</code> class. This is the
                first item's accordion body.
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Schedule;
