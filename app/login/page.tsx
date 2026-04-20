import { signIn } from "@/auth";

interface Props {
  searchParams: Promise<{ error?: string; callbackUrl?: string }>;
}

export default async function LoginPage({ searchParams }: Props) {
  const params = await searchParams;
  const isDenied = params.error === "AccessDenied";
  const callbackUrl = params.callbackUrl ?? "/";

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#2659a5",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Poppins', sans-serif",
        padding: "24px",
      }}
    >
      {/* Background decoration */}
      <div
        style={{
          position: "fixed",
          top: -100,
          right: -100,
          width: 400,
          height: 400,
          background: "rgba(215,217,0,0.06)",
          borderRadius: "50%",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "fixed",
          bottom: -80,
          left: -60,
          width: 280,
          height: 280,
          background: "rgba(255,255,255,0.04)",
          borderRadius: "50%",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          background: "#fff",
          borderRadius: 28,
          padding: "48px 44px",
          maxWidth: 420,
          width: "100%",
          boxShadow: "0 24px 80px rgba(0,0,0,0.25)",
          position: "relative",
        }}
      >
        {/* Logo */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            marginBottom: 32,
            justifyContent: "center",
          }}
        >
          <span
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 800,
              fontSize: 28,
              color: "#2659a5",
              letterSpacing: "-0.5px",
            }}
          >
            gogroup
          </span>
          <span
            style={{
              background: "#d7d900",
              color: "#2659a5",
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 700,
              fontSize: "0.6rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              padding: "5px 12px",
              borderRadius: 999,
            }}
          >
            TECH
          </span>
        </div>

        {/* Title */}
        <h1
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 800,
            fontSize: "1.4rem",
            color: "#1a1a1a",
            margin: "0 0 8px",
            textAlign: "center",
            lineHeight: 1.3,
          }}
        >
          Onboarding Tech
        </h1>
        <p
          style={{
            color: "#888",
            fontSize: "0.85rem",
            margin: "0 0 32px",
            textAlign: "center",
            lineHeight: 1.6,
          }}
        >
          Acesso restrito ao time de tecnologia.
          <br />
          Faça login com seu e-mail corporativo.
        </p>

        {/* Error message */}
        {isDenied && (
          <div
            style={{
              background: "#fef2f2",
              border: "1px solid #fca5a5",
              borderRadius: 12,
              padding: "12px 16px",
              marginBottom: 24,
              fontSize: "0.8rem",
              color: "#dc2626",
              textAlign: "center",
              lineHeight: 1.5,
            }}
          >
            Acesso negado. Use um e-mail{" "}
            <strong>@gocase.com, @gobeaute.com, @gogroup.com</strong> ou{" "}
            <strong>@jumpventures.com</strong>.
          </div>
        )}

        {/* Sign in button */}
        <form
          action={async () => {
            "use server";
            await signIn("google", { redirectTo: callbackUrl });
          }}
        >
          <button
            type="submit"
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 12,
              background: "#fff",
              border: "2px solid #e5e7eb",
              borderRadius: 14,
              padding: "14px 20px",
              cursor: "pointer",
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 600,
              fontSize: "0.9rem",
              color: "#1a1a1a",
              transition: "border-color 0.2s, box-shadow 0.2s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.borderColor = "#2659a5";
              (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 0 0 3px rgba(38,89,165,0.1)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.borderColor = "#e5e7eb";
              (e.currentTarget as HTMLButtonElement).style.boxShadow = "none";
            }}
          >
            {/* Google icon */}
            <svg width="20" height="20" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Entrar com Google
          </button>
        </form>

        {/* Footer */}
        <p
          style={{
            marginTop: 24,
            fontSize: "0.7rem",
            color: "#bbb",
            textAlign: "center",
            lineHeight: 1.6,
          }}
        >
          Domínios permitidos: gocase.com · gobeaute.com
          <br />
          gogroup.com · jumpventures.com
        </p>
      </div>
    </div>
  );
}
