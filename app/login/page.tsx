import { signIn } from "@/auth";
import LoginButton from "./LoginButton";

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
            <strong>@gocase.com, @gobeaute.com, @gobeaute.com.br, @gogroup.com</strong> ou{" "}
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
          <LoginButton />
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
          Domínios permitidos: gocase.com · gobeaute.com · gobeaute.com.br
          <br />
          gogroup.com · jumpventures.com
        </p>
      </div>
    </div>
  );
}
