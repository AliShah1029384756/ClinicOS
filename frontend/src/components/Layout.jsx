import { Link, Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="layout">
      <aside className="sidebar">
        <h2>ClinicOS</h2>
        <nav className="stack">
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/sessions">Sessions</Link>
          <Link to="/sessions/new">Schedule Session</Link>
          <Link to="/treatment-plan">Treatment Plan</Link>
          <Link to="/admin">Admin</Link>
        </nav>
      </aside>
      <section className="content">
        <Outlet />
      </section>
    </div>
  );
}
