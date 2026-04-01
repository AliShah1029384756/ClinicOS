import { Link } from "react-router-dom";

export default function SessionList() {
  return (
    <main className="page">
      <h1>Session List</h1>
      <p>Recovered session management view. Connect API to fetch and filter sessions.</p>
      <ul>
        <li><Link to="/sessions/1">Session #1 - Details</Link></li>
        <li><Link to="/sessions/2">Session #2 - Details</Link></li>
        <li><Link to="/sessions/3">Session #3 - Details</Link></li>
      </ul>
    </main>
  );
}
