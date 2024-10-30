import  { useState } from "react";
import sortOptions from "../../../constants/sort_options";

function SortForm() {
  const [options, setOptions] = useState(sortOptions.map(option => ({
    ...option,
    checked: option.checked || false
  })));

  const handleChange = (index) => {
    const updatedOptions = options.map((option, i) => ({
      ...option,
      checked: i === index, 
    }));
    setOptions(updatedOptions);
  };

  return (
    <form>
      {options.map((option, index) => (
        <div className="form-check mt-2" key={index}>
          <input
            className="form-check-input"
            type="checkbox"
            name="sortOptions"
            value={option.value}
            checked={option.checked}
            onChange={() => handleChange(index)}
          />
          <label className="form-check-label" htmlFor={option.id}>
            {option.label}
          </label>
        </div>
      ))}
    </form>
  );
}

export default SortForm;
