"use client";

import { useEditMode } from "@/context/EditModeContext";
import { useSession, signOut } from "next-auth/react";

const links = [
  { href: "#home",         label: "Início" },
  { href: "#valores",      label: "Valores" },
  { href: "#universos",    label: "Universos" },
  { href: "#marcas",       label: "Marcas" },
  { href: "#organograma",  label: "Setores" },
  { href: "#stack",        label: "Stack" },
  { href: "#ferramentas",  label: "Ferramentas" },
  { href: "#equipe",       label: "Equipe" },
];

export default function Navbar() {
  const { isEditMode, toggleEditMode } = useEditMode();
  const { data: session } = useSession();

  return (
    <nav className="navbar" style={{ gap: 16 }}>
      <a href="#home" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none", flexShrink: 0 }}>
        <span style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 800, fontSize: 22, color: "#fff", letterSpacing: "-0.5px" }}>
          gogroup
        </span>
        <span className="pill" style={{ fontSize: "0.55rem", padding: "4px 10px" }}>TECH</span>
      </a>

      <ul className="nav-links">
        {links.map((l) => (
          <li key={l.href}>
            <a href={l.href}>{l.label}</a>
          </li>
        ))}
      </ul>

      <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>

        {/* Edit button */}
        <button
          onClick={toggleEditMode}
          style={{
            background: isEditMode ? "#d7d900" : "rgba(215,217,0,0.15)",
            color: isEditMode ? "#2659a5" : "#d7d900",
            border: isEditMode ? "none" : "1px solid rgba(215,217,0,0.4)",
            borderRadius: 8,
            padding: "6px 14px",
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 700,
            fontSize: "0.62rem",
            cursor: "pointer",
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            transition: "all 0.2s",
            whiteSpace: "nowrap",
          }}
        >
          {isEditMode ? "✓ Editando" : "✏ Editar"}
        </button>

        {session?.user && (
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span
              style={{
                color: "rgba(255,255,255,0.6)",
                fontSize: "0.65rem",
                maxWidth: 140,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {session.user.name ?? session.user.email}
            </span>
            <button
              onClick={() => signOut({ callbackUrl: "/login" })}
              style={{
                background: "rgba(255,255,255,0.1)",
                color: "rgba(255,255,255,0.8)",
                border: "none",
                borderRadius: 8,
                padding: "6px 12px",
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 600,
                fontSize: "0.62rem",
                cursor: "pointer",
                whiteSpace: "nowrap",
              }}
            >
              Sair
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
