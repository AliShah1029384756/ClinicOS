import { Component } from "react";

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error) {
    // Keep logging lightweight for this recovered build.
    console.error("UI error:", error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <main className="page">
          <h1>Something went wrong</h1>
          <p>Please refresh the page and try again.</p>
        </main>
      );
    }

    return this.props.children;
  }
}