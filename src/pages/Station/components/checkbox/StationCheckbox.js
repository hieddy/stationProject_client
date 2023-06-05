import { useState, useCallback } from "react";
import API from "../../../../API";

const checkBoxList = ["주차비 무료"];

const StationCheckbox = () => {
  const [checkedList, setCheckedList] = useState([]);
  const [isChecked, setIsChecked] = useState(false);

  const checkedItemHandler = (value, isChecked) => {
    if (isChecked) {
      setCheckedList((prev) => [...prev, value]);
      return;
    }
    if (!isChecked && checkedList.includes(value)) {
      setCheckedList(checkedList.filter((item) => item !== value));
      return;
    }
    return;
  };
  const queryData = {};
  if (checkedList.includes("주차비 무료")) {
    queryData["parkingFee"] = "N";
  }
  const checkHandler = (e, value) => {
    setIsChecked(!isChecked);
    checkedItemHandler(value, e.target.checked);
    console.log(value, e.target.checked);
  };
  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      console.log("-----", queryData);
      try {
        const res = await API.get(
          `http://${process.env.REACT_APP_BACKEND_URL}/api/stations?parkingFee=${queryData["parkingFee"]}`
        );
        console.log(res);
      } catch (err) {
        console.log(err.response.data.message);
      }

      console.log("checkedList:", checkedList);
    },
    [checkedList]
  );
  return (
    <div>
      <h1>필터링 조건</h1>
      <form onSubmit={handleSubmit}>
        <div className="checkbox-group">
          {checkBoxList.map((item, idx) => (
            <div className="checkbox" key={idx}>
              <input
                type="checkbox"
                id={item}
                checked={checkedList.includes(item)}
                onChange={(e) => checkHandler(e, item)}
              />
              <label htmlFor={item}>{item}</label>
            </div>
          ))}
        </div>
        <button type="submit">submit</button>
      </form>
    </div>
  );
};

export { StationCheckbox };
