export default function BirthdatePicker(
  { setDate: { setDay, setMonth, setYear } },
) {

  return (
    <div className="input-date-wrapper">
      <div className="input-wrapper">
        <label htmlFor="day">DAY</label>
        <input
          type="number"
          id="day"
          placeholder="DD"
          onChange={({ target: { value } }) => setDay(+value)}
        />
      </div>

      <div className="input-wrapper">
        <label htmlFor="month">MONTH</label>
        <input
          type="number"
          id="month"
          placeholder="MM"
          onChange={({ target: { value } }) => setMonth(+value)}
        />
      </div>

      <div className="input-wrapper">
        <label htmlFor="year">YEAR</label>
        <input
          type="number"
          id="year"
          placeholder="YYYY"
          onChange={({ target: { value } }) => setYear(+value)}
        />
      </div>
    </div>
  );
}
