export default function Hero() {
  return (
    <section
      id="home"
      style={{
        background: "#2659a5",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        paddingTop: 64,
      }}
    >
      {/* Yellow border frame */}
      <div
        className="hero-frame"
        style={{
          flex: 1,
          minHeight: "calc(100vh - 104px)",
          background: "#2659a5",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "clamp(32px,6vw,60px) clamp(20px,5vw,40px)",
          position: "relative",
          textAlign: "center",
        }}
      >
        {/* Three dots top-left */}
        <div
          style={{
            position: "absolute",
            top: 24,
            left: 28,
            color: "#d7d900",
            fontSize: "0.6rem",
            letterSpacing: 5,
          }}
        >
          ● ● ●
        </div>

        {/* Badge */}
        <div className="pill reveal" style={{ marginBottom: 28 }}>
          CONSTRUINDO O FUTURO
        </div>

        {/* Logo large */}
        <div className="reveal reveal-delay-1" style={{ marginBottom: 20 }}>
          <span
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 800,
              fontSize: "clamp(52px, 8vw, 96px)",
              color: "#ffffff",
              letterSpacing: "-3px",
              lineHeight: 1,
              display: "block",
            }}
          >
            gogroup
          </span>
        </div>

        {/* Main title */}
        <h1
          className="reveal reveal-delay-2"
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 700,
            fontSize: "clamp(28px, 4vw, 52px)",
            color: "#ffffff",
            margin: "0 0 12px",
            lineHeight: 1.15,
          }}
        >
          Bem-vindo ao time.
        </h1>

        {/* Subtitle */}
        <p
          className="reveal reveal-delay-3"
          style={{
            fontSize: "clamp(16px, 2vw, 22px)",
            color: "rgba(255,255,255,0.8)",
            margin: "0 0 28px",
            maxWidth: 560,
            fontWeight: 400,
          }}
        >
          Aqui você vai entender como tudo se conecta.
        </p>

        {/* Small tag */}
        <div
          className="reveal reveal-delay-4"
          style={{
            color: "rgba(215,217,0,0.9)",
            fontSize: "0.8rem",
            fontWeight: 600,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            marginBottom: 60,
          }}
        >
          Plataforma de Onboarding · Time de Tecnologia
        </div>

        {/* Scroll arrow */}
        <a
          href="#valores"
          className="bounce"
          style={{
            color: "#d7d900",
            fontSize: 28,
            textDecoration: "none",
            display: "block",
            lineHeight: 1,
          }}
          aria-label="Ir para a próxima seção"
        >
          ↓
        </a>
      </div>
    </section>
  );
}
