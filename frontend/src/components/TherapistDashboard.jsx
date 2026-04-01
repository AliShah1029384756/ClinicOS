import { Link } from "react-router-dom";
import CalendarView from "./CalendarView";
import GoalTracker from "./GoalTracker";
import PatientListCard from "./PatientListCard";

export default function TherapistDashboard() {
  return (
    <main className="page">
      <h1>ClinicOS Therapist Dashboard</h1>
      <p>Manage sessions, treatment plans, and patient progress from one workspace.</p>
      <div className="card-row">
        <Link className="card" to="/sessions">Session List</Link>
        <Link className="card" to="/sessions/new">Schedule Session</Link>
        <Link className="card" to="/treatment-plan">Create Treatment Plan</Link>
        <Link className="card" to="/caregiver">Caregiver Portal</Link>
      </div>
      <div className="grid" style={{ marginTop: 16 }}>
        <CalendarView />
        <GoalTracker />
        <PatientListCard />
      </div>
    </main>
  );
}
