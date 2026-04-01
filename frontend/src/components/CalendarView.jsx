export default function CalendarView() {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
  return (
    <section className="card">
      <h3>Weekly Calendar</h3>
      <div className="grid">
        {days.map((day) => (
          <div className="mini" key={day}>{day}</div>
        ))}
      </div>
    </section>
  );
}
