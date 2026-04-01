const goals = [
  { name: "Eye contact", progress: 60 },
  { name: "Turn taking", progress: 45 },
  { name: "Sensory regulation", progress: 70 },
];

export default function GoalTracker() {
  return (
    <section className="card">
      <h3>Goal Tracker</h3>
      {goals.map((goal) => (
        <div key={goal.name} style={{ marginBottom: 10 }}>
          <div>{goal.name}</div>
          <div className="progress"><span style={{ width: `${goal.progress}%` }} /></div>
        </div>
      ))}
    </section>
  );
}
