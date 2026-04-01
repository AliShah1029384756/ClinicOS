const patients = ["Ayaan", "Hadi", "Sara", "Mariam"];

export default function PatientListCard() {
  return (
    <section className="card">
      <h3>Patients</h3>
      <ul>
        {patients.map((p) => (
          <li key={p}>{p}</li>
        ))}
      </ul>
    </section>
  );
}
