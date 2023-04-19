import iconArrow from "../assets/images/icon-arrow.svg";

export default function DateResult({ date: { day, month, year } }) {
  return (
    <div className="result-wrapper">
      <button
        className="process-btn"
        id="process-btn"
        onClick={() =>
          resultButtonClickHandler(
            { day, month, year },
          )}
      >
        <img src={iconArrow} alt="arrow down" />
      </button>
      <div className="result">
        <span className="result-years">
          <span data-type="year" className="result-count">{"--"}</span>{"  "}
          years
        </span>
        <span className="result-month">
          <span data-type="month" className="result-count">{"--"}</span>{"  "}
          months
        </span>
        <span className="result-day">
          <span data-type="day" className="result-count">{"--"}</span>{"  "}days
        </span>
      </div>
    </div>
  );
}

function updateValues(date) {
  for (const key in date) {
    if (date[key] === null) {
      return resetDateUI();
    }
  }

  const dateDiff = calculateDateDiff(date);

  Object.keys(dateDiff).forEach(key => {
    const element = document.querySelector(`.result-${key} > .result-count`);
    element.textContent = dateDiff[key];
  });
}

function resetDateUI() {
  const elements = document.querySelectorAll('.result-count');

  for (const element of elements) {
    element.textContent = '--';
  }
}

function calculateDateDiff(date) {
  const { floor } = Math;
  const { day, month, year } = date;
  const currentDate = new Date();
  const inputDate = new Date(year, month - 1, day);
  const timeDiff = currentDate.getTime() - inputDate.getTime();
  const yearDiff = floor(timeDiff / (1000 * 60 * 60 * 24 * 365.25));
  const monthDiff = floor(timeDiff / (1000 * 60 * 60 * 24 * 30.44)) % 12;
  const dayDiff = floor(timeDiff / (1000 * 60 * 60 * 24) % 30.44);
  const dateDiff = {
    years: yearDiff,
    month: monthDiff,
    day: dayDiff,
  };

  return dateDiff;
}

function resultButtonClickHandler({ day, month, year }) {
  const isValid = dateValidation({ day, month, year });

  if (isValid) updateValues({ day, month, year })
  else resetDateUI();
}

function dateValidation({ day, month, year }) {
  const date = { day, month, year };
  const res = [];

  Object.keys(date).forEach((key) => {
    const element = document.getElementById(key).parentElement;
    const msg = {};

    switch (key) {
      case "day":
        const isEvenMonth = month % 2 === 0;
        const isLeapYear = year % 4 === 0;

        if (
          (day === null) ||
          (month === 2 && !isLeapYear && day > 28) ||
          (isEvenMonth && (day > 31 || day < 1)) ||
          (!isEvenMonth && (day > 30 || day < 1)) ||
          (isLeapYear && month === 2 && day > 29)
        ) {
          msg.day = { isSuccess: false, message: "Must be a valid day" };
        } else msg.day = { isSuccess: true };
        break;
      case "month":
        if ((month === null) || month > 12 || month < 1) {
          msg.month = { isSuccess: false, message: "Must be a valid month" };
        } else msg.month = { isSuccess: true };
        break;
      case "year":
        const date = new Date();
        const currentYear = date.getFullYear();
        const currentMonth = date.getMonth() + 1;
        const currentDate = date.getDate();

        if (
          (year === currentYear &&
              (month > currentMonth ||
                month === currentMonth && day > currentDate) ||
            (year > currentYear))
        ) {
          msg.year = { isSuccess: false, message: "Must be in the past" };
        } else if (year === null || year < 1) {
          msg.year = { isSuccess: false, message: "Must be a valid year" };
        } else msg.year = { isSuccess: true };
        break;
      default:
        throw new Error("something went error!");
    }

    // console.log(key, msg[key].isSuccess, date[key]);

    if (msg[key].isSuccess) {
      const smallElement = element.querySelector(".error-msg");

      if (smallElement) {
        smallElement.remove();
        element.classList.remove("error");
      }

      res.push(true);
    } else {
      const smallElement = createSmallMessage(msg[key].message);

      res.push(false);
      if (!element.querySelector(".error-msg")) {
        element.appendChild(smallElement);
      }

      element.classList.add("error");
    }
  });

  return (res.every(Boolean));
}

function createSmallMessage(text) {
  const element = document.createElement("small");

  element.classList.add("error-msg");
  element.textContent = text;

  return element;
}
