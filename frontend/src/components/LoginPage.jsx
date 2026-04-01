import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("therapist@clinic.com");
  const [password, setPassword] = useState("demo@123");

  const onSubmit = (e) => {
    e.preventDefault();
    login({ id: "demo-therapist", role: "therapist", name: "Demo Therapist", email });
    navigate("/dashboard", { replace: true });
  };

  return (
    <main className="page">
      <h1>ClinicOS Login</h1>
      <form className="stack" onSubmit={onSubmit}>
        <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
        <button type="submit">Login</button>
      </form>
    </main>
  );
}
