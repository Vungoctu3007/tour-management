function Schedule({detailRoute}) {
  console.log(detailRoute);
  return (
    <div className="border rounded p-2">
      <h2>Chương trình tour</h2>
      <div className="accordion accordion-flush" id="accordionFlushExample">
        {detailRoute.legs.map((item, index) => (
          <div className="accordion-item border rounded mt-4" key={index}>
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
                          src={require(`../../../assets/images/Tour/${item.textImage}`)}
                          style={{
                            width: "150px",
                            height: "100px",
                            objectFit: "cover",
                          }}
                          alt={item.textImage}
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
               {item.description}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    
  );
}
export default Schedule;
