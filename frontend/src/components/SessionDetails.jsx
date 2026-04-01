import SessionNotes from "./SessionNotes";

export default function SessionDetails() {
  return (
    <main className="page">
      <h1>Session Details</h1>
      <div className="grid">
        <section className="card"><h3>Status</h3><p>Scheduled</p></section>
        <section className="card"><h3>Attendance</h3><p>Pending</p></section>
        <section className="card"><h3>Duration</h3><p>45 minutes</p></section>
      </div>
      <SessionNotes />
    </main>
  );
}
