import { useState } from "react";

export default function SessionScheduling() {
  const [form, setForm] = useState({ patientName: "", sessionDate: "", durationMinutes: 45, sessionType: "individual" });

  return (
    <main className="page">
      <h1>Schedule Session</h1>
      <form className="stack">
        <input placeholder="Patient Name" value={form.patientName} onChange={(e) => setForm({ ...form, patientName: e.target.value })} />
        <input type="datetime-local" value={form.sessionDate} onChange={(e) => setForm({ ...form, sessionDate: e.target.value })} />
        <input type="number" value={form.durationMinutes} onChange={(e) => setForm({ ...form, durationMinutes: Number(e.target.value) })} />
        <select value={form.sessionType} onChange={(e) => setForm({ ...form, sessionType: e.target.value })}>
          <option value="individual">Individual</option>
          <option value="group">Group</option>
          <option value="assessment">Assessment</option>
        </select>
        <button type="button">Save Session</button>
      </form>
    </main>
  );
}
