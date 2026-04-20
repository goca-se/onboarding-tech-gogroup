export default function Footer() {
  return (
    <footer
      style={{
        background: "#2659a5",
        borderTop: "4px solid #d7d900",
        padding: "56px 40px",
        textAlign: "center",
      }}
    >
      <div style={{ marginBottom: 12, color: "#d7d900", fontSize: "0.55rem", letterSpacing: 5 }}>
        ● ● ●
      </div>

      <div
        style={{
          fontFamily: "'Poppins', sans-serif",
          fontWeight: 800,
          fontSize: 32,
          color: "#fff",
          letterSpacing: "-1px",
          marginBottom: 12,
        }}
      >
        gogroup
      </div>

      <div style={{ marginBottom: 20 }}>
        <span
          className="pill"
          style={{ fontSize: "0.62rem", padding: "5px 14px" }}
        >
          CONSTRUINDO O FUTURO
        </span>
      </div>

      <p
        style={{
          color: "rgba(255,255,255,0.5)",
          fontSize: "0.8rem",
          margin: 0,
          fontWeight: 400,
          letterSpacing: "0.04em",
        }}
      >
        Gogroup Tech Onboarding · 2026
      </p>
    </footer>
  );
}
