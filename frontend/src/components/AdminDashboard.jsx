export default function AdminDashboard() {
  return (
    <main className="page">
      <h1>Admin Dashboard</h1>
      <div className="grid">
        <div className="card"><h3>Total Therapists</h3><p>12</p></div>
        <div className="card"><h3>Active Sessions</h3><p>28</p></div>
        <div className="card"><h3>Open Plans</h3><p>19</p></div>
      </div>
    </main>
  );
}
