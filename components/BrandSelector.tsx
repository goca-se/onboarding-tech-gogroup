"use client";

import { useBrand, type Brand } from "@/context/BrandContext";

const BRANDS: { value: Brand; label: string; accent: string }[] = [
  { value: "gobeaute", label: "Gobeaute", accent: "#e61782" },
  { value: "gocase",   label: "Gocase",   accent: "#E8403A" },
];

export function BrandSelector({ variant = "light" }: { variant?: "light" | "dark" }) {
  const { brand, setBrand } = useBrand();
  const isDark = variant === "dark";

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24 }}>
      <span style={{
        fontFamily: "'Poppins', sans-serif",
        fontSize: "0.6rem",
        fontWeight: 600,
        color: isDark ? "rgba(255,255,255,0.45)" : "#aaa",
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        whiteSpace: "nowrap",
      }}>
        Contexto do time:
      </span>
      <div style={{
        display: "flex",
        background: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.07)",
        borderRadius: 10,
        padding: 3,
        gap: 2,
      }}>
        {BRANDS.map((b) => {
          const active = brand === b.value;
          return (
            <button
              key={b.value}
              onClick={() => setBrand(b.value)}
              style={{
                background: active ? "#fff" : "transparent",
                color: active ? b.accent : (isDark ? "rgba(255,255,255,0.45)" : "#999"),
                border: "none",
                borderRadius: 7,
                padding: "5px 14px",
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 700,
                fontSize: "0.62rem",
                cursor: "pointer",
                letterSpacing: "0.04em",
                textTransform: "uppercase",
                transition: "all 0.18s ease",
                whiteSpace: "nowrap",
              }}
            >
              {b.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
