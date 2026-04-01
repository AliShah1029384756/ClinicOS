export default function TreatmentPlanForm() {
  return (
    <main className="page">
      <h1>Treatment Plan Form</h1>
      <p>Recovered plan creation module with goal and intervention structure.</p>
      <form className="stack">
        <input placeholder="Patient Name" />
        <input placeholder="Therapist ID" />
        <input placeholder="Diagnosis" />
        <textarea rows="5" placeholder="Goals and interventions" />
        <select defaultValue="draft">
          <option value="draft">Draft</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
          <option value="archived">Archived</option>
        </select>
        <button type="button">Save Plan</button>
      </form>
    </main>
  );
}
