import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "bootstrap/dist/css/bootstrap.min.css";

function Profile() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <div>
      <h1>Profile</h1>
      <div className="container mt-4">
        <div className="">
          <div className="">
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
            //   dateFormat="dd-MM-yyyy"
            //   className="form-control"
            //   id="datePickerInput"
              showMonthDropdown
              showYearDropdown
              dropdownMode="select"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
