import React, { useState } from "react";
import styled from "@emotion/styled";
import { ko } from "date-fns/esm/locale";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import getYear from "date-fns/getYear";
import getMonth from "date-fns/getMonth";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import "../Date.scss";

const SDatePicker = styled(DatePicker)`
  font-size: 12px;
  border-radius: 4px;
  text-align: center;
  box-sizing: border-box;
`;

const Picker = ({ date, changeClose }) => {
  const [startDate, setStartDate] = useState(date);

  function changeDate(date) {
    setStartDate(date);
    changeClose(date);
  }

  return (
    <>
      <SDatePicker
        calendarClassName="custom_datepicker"
        inline
        locale={ko}
        selected={startDate}
        dateFormat="yyyy.MM.dd(eee)"
        onChange={(date) => changeDate(date)}
        renderCustomHeader={({
          date,
          prevMonthButtonDisabled,
          nextMonthButtonDisabled,
          decreaseMonth,
          increaseMonth,
        }) => (
          <div
            style={{
              margin: 10,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              fontSize: "14px",
              fontWeight: "bold",
            }}
          >
            <div
              className="btn_month btn_month-prev"
              onClick={decreaseMonth}
              disabled={prevMonthButtonDisabled}
            >
              <KeyboardArrowLeftIcon style={{ display: "flex" }} />
            </div>
            <div className="month-day">
              {getYear(date)}. {("0" + (getMonth(date) + 1)).slice(-2)}
            </div>

            <div
              className="btn_month btn_month-next"
              onClick={increaseMonth}
              disabled={nextMonthButtonDisabled}
            >
              <KeyboardArrowLeftIcon
                style={{ display: "flex", transform: "rotateY(180deg)" }}
              />
            </div>
          </div>
        )}
      />
    </>
  );
};

export default Picker;
