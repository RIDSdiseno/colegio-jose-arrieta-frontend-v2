import { Component } from "react";

class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    if (import.meta.env.DEV) {
      console.error("[ErrorBoundary]", error, info);
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "2rem", textAlign: "center", fontFamily: "sans-serif" }}>
          <h1 style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "0.5rem" }}>Algo salió mal</h1>
          <p style={{ color: "#64748b", marginBottom: "1.5rem" }}>Ocurrió un error inesperado. Por favor recarga la página.</p>
          <button
            onClick={() => window.location.reload()}
            style={{ background: "#5151FA", color: "#fff", border: "none", borderRadius: "9999px", padding: "0.75rem 1.5rem", cursor: "pointer", fontWeight: "600" }}
          >
            Recargar página
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
