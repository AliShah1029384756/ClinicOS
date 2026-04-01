export default function Toast({ message = "Saved successfully" }) {
  return <div className="toast">{message}</div>;
}
