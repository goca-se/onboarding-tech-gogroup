"use client";

import { useState, type FormEvent } from "react";
import type { Node } from "@xyflow/react";

interface Props {
  node: Node;
  onSave: (id: string, data: Record<string, unknown>) => void;
  onClose: () => void;
}

export default function NodeEditorPanel({ node, onSave, onClose }: Props) {
  const [draft, setDraft] = useState<Record<string, unknown>>(
    node.data as Record<string, unknown>
  );

  const updateField = (key: string, value: unknown) =>
    setDraft((d) => ({ ...d, [key]: value }));

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSave(node.id, draft);
    onClose();
  };

  const isColorKey = (k: string) =>
    ["color", "bg", "border", "textColor", "accentLight"].includes(k);

  return (
    <div
      style={{
        position: "absolute",
        top: 16,
        right: 16,
        background: "#1a2340",
        border: "2px solid #d7d900",
        borderRadius: 16,
        padding: "20px",
        width: 300,
        zIndex: 200,
        fontFamily: "'DM Sans', sans-serif",
        boxShadow: "0 8px 40px rgba(0,0,0,0.7)",
        maxHeight: "calc(100% - 32px)",
        overflowY: "auto",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 16,
        }}
      >
        <div>
          <div
            style={{
              color: "#d7d900",
              fontWeight: 700,
              fontSize: "0.72rem",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
            }}
          >
            Editar Card
          </div>
          <div style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.62rem" }}>
            {node.id} · {node.type}
          </div>
        </div>
        <button
          onClick={onClose}
          style={{
            background: "rgba(255,255,255,0.1)",
            border: "none",
            color: "#fff",
            cursor: "pointer",
            fontSize: "0.9rem",
            borderRadius: 6,
            width: 28,
            height: 28,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          ✕
        </button>
      </div>

      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: 12 }}
      >
        {Object.entries(draft).map(([key, value]) => {
          if (isColorKey(key)) {
            return (
              <div key={key}>
                <label
                  style={{
                    color: "rgba(255,255,255,0.5)",
                    fontSize: "0.62rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    display: "block",
                    marginBottom: 4,
                  }}
                >
                  {key}
                </label>
                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  <input
                    type="color"
                    value={typeof value === "string" ? value : "#000000"}
                    onChange={(e) => updateField(key, e.target.value)}
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: 6,
                      border: "none",
                      cursor: "pointer",
                      padding: 0,
                      background: "none",
                    }}
                  />
                  <input
                    type="text"
                    value={typeof value === "string" ? value : ""}
                    onChange={(e) => updateField(key, e.target.value)}
                    style={{
                      flex: 1,
                      background: "rgba(255,255,255,0.08)",
                      border: "1px solid rgba(255,255,255,0.15)",
                      borderRadius: 8,
                      padding: "6px 10px",
                      color: "#fff",
                      fontSize: "0.78rem",
                      fontFamily: "monospace",
                    }}
                  />
                </div>
              </div>
            );
          }
          if (Array.isArray(value)) {
            return (
              <div key={key}>
                <label
                  style={{
                    color: "rgba(255,255,255,0.5)",
                    fontSize: "0.62rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    display: "block",
                    marginBottom: 4,
                  }}
                >
                  {key} (JSON)
                </label>
                <textarea
                  defaultValue={JSON.stringify(value, null, 2)}
                  onBlur={(e) => {
                    try {
                      updateField(key, JSON.parse(e.target.value));
                    } catch { /* empty */ }
                  }}
                  rows={5}
                  style={{
                    width: "100%",
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.15)",
                    borderRadius: 8,
                    padding: "8px",
                    color: "#fff",
                    fontSize: "0.68rem",
                    fontFamily: "monospace",
                    resize: "vertical",
                    boxSizing: "border-box",
                  }}
                />
              </div>
            );
          }
          if (typeof value === "boolean") {
            return (
              <label
                key={key}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  cursor: "pointer",
                }}
              >
                <input
                  type="checkbox"
                  checked={value}
                  onChange={(e) => updateField(key, e.target.checked)}
                  style={{ width: 16, height: 16, cursor: "pointer", accentColor: "#d7d900" }}
                />
                <span style={{ color: "#fff", fontSize: "0.82rem" }}>{key}</span>
              </label>
            );
          }
          if (typeof value === "string") {
            return (
              <div key={key}>
                <label
                  style={{
                    color: "rgba(255,255,255,0.5)",
                    fontSize: "0.62rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    display: "block",
                    marginBottom: 4,
                  }}
                >
                  {key}
                </label>
                <input
                  type="text"
                  value={value}
                  onChange={(e) => updateField(key, e.target.value)}
                  style={{
                    width: "100%",
                    background: "rgba(255,255,255,0.08)",
                    border: "1px solid rgba(255,255,255,0.15)",
                    borderRadius: 8,
                    padding: "8px 10px",
                    color: "#fff",
                    fontSize: "0.82rem",
                    fontFamily: "'DM Sans', sans-serif",
                    boxSizing: "border-box",
                  }}
                />
              </div>
            );
          }
          return null;
        })}

        <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
          <button
            type="submit"
            style={{
              flex: 1,
              background: "#d7d900",
              color: "#2659a5",
              border: "none",
              borderRadius: 8,
              padding: "10px",
              fontWeight: 700,
              cursor: "pointer",
              fontSize: "0.82rem",
              fontFamily: "'Poppins', sans-serif",
            }}
          >
            Salvar
          </button>
          <button
            type="button"
            onClick={onClose}
            style={{
              background: "rgba(255,255,255,0.1)",
              color: "#fff",
              border: "none",
              borderRadius: 8,
              padding: "10px 14px",
              cursor: "pointer",
              fontSize: "0.82rem",
            }}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}
