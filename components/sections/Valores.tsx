"use client";

import { useState } from "react";
import { useEditableData } from "@/hooks/useEditableData";
import { useEditMode } from "@/context/EditModeContext";

interface Pillar { title: string; desc: string; accent: string }
interface Value  { title: string; mantra: string; desc: string; bg: string; textColor: string }

const defaultPillars: Pillar[] = [
  { title: "Alma",      desc: "Paixão pelo que fazemos e construção de empresas campeãs", accent: "#e5381a" },
  { title: "Ambição",   desc: "Aceleração e transformação de negócios",                   accent: "#e61782" },
  { title: "Inovação",  desc: "O que nos trouxe até aqui não nos levará adiante",         accent: "#2659a5" },
];

const defaultValues: Value[] = [
  { title: "Mente Aberta",       mantra: "Curioso sempre. Ego, nunca.",              desc: "Estamos sempre abertos a novas ideias. Valorizamos curiosidade, diversidade de perspectivas e aprendizado contínuo.", bg: "#e5381a", textColor: "#fff" },
  { title: "Ponta Firme",        mantra: "Prometeu? Cumpre. Com padrão.",            desc: "Entregamos o que prometemos. Sem pontas soltas, sem procrastinar. Consistência e alta qualidade em tudo.",            bg: "#2659a5", textColor: "#fff" },
  { title: "Transparência Máxima", mantra: "Seja sincero: na bola, sem cotovelada.", desc: "Falamos o que pensamos com contexto e empatia. Sem rodeios, sem diplomatismo vazio.",                                bg: "#e61782", textColor: "#fff" },
  { title: "Time Campeão",       mantra: "Feedback franco, evolução contínua.",      desc: "Pensamos em \"nós\", não em \"eu\". Trabalhamos com os outros setores, não para eles.",                              bg: "#d7d900", textColor: "#2659a5" },
  { title: "Amor pelo Cliente",  mantra: "Ouça, resolva, surpreenda.",               desc: "O cliente é nosso chefe. Nossa obsessão é encantar — não apenas resolver.",                                          bg: "#e5273c", textColor: "#fff" },
];

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "7px 10px",
  borderRadius: 8,
  border: "1px solid #ddd",
  fontFamily: "'Poppins', sans-serif",
  fontSize: "0.82rem",
  boxSizing: "border-box",
};

function PillarEditor({
  pillar,
  onSave,
  onCancel,
}: { pillar: Pillar; onSave: (p: Pillar) => void; onCancel: () => void }) {
  const [d, setD] = useState({ ...pillar });
  return (
    <div style={{ background: "#fff", borderRadius: 20, padding: "20px", borderTop: `5px solid ${d.accent}`, boxShadow: "0 4px 20px rgba(0,0,0,0.1)", display: "flex", flexDirection: "column", gap: 8 }}>
      <div style={{ display: "flex", gap: 8 }}>
        <input value={d.title} onChange={(e) => setD({ ...d, title: e.target.value })} style={{ ...inputStyle, fontWeight: 700 }} placeholder="Título" />
        <input type="color" value={d.accent} onChange={(e) => setD({ ...d, accent: e.target.value })} style={{ width: 36, height: 36, borderRadius: 6, border: "1px solid #ddd", cursor: "pointer", padding: 2, flexShrink: 0 }} />
      </div>
      <textarea value={d.desc} onChange={(e) => setD({ ...d, desc: e.target.value })} style={{ ...inputStyle, resize: "vertical", minHeight: 56 }} placeholder="Descrição" />
      <div style={{ display: "flex", gap: 6 }}>
        <button onClick={() => onSave(d)} style={{ flex: 1, background: "#2659a5", color: "#fff", border: "none", borderRadius: 8, padding: "8px", fontWeight: 700, cursor: "pointer", fontSize: "0.8rem" }}>Salvar</button>
        <button onClick={onCancel} style={{ background: "#f0f0f0", color: "#666", border: "none", borderRadius: 8, padding: "8px 12px", cursor: "pointer", fontSize: "0.8rem" }}>Cancelar</button>
      </div>
    </div>
  );
}

function ValueEditor({
  value,
  onSave,
  onCancel,
}: { value: Value; onSave: (v: Value) => void; onCancel: () => void }) {
  const [d, setD] = useState({ ...value });
  return (
    <div style={{ background: d.bg, borderRadius: 24, padding: "20px", display: "flex", flexDirection: "column", gap: 8 }}>
      <div style={{ display: "flex", gap: 6 }}>
        <input value={d.title} onChange={(e) => setD({ ...d, title: e.target.value })} style={{ ...inputStyle, fontWeight: 700, flex: 1 }} placeholder="Título" />
        <input type="color" value={d.bg} onChange={(e) => setD({ ...d, bg: e.target.value })} title="Cor de fundo" style={{ width: 30, height: 30, borderRadius: 6, border: "none", cursor: "pointer", padding: 0, flexShrink: 0 }} />
        <input type="color" value={d.textColor} onChange={(e) => setD({ ...d, textColor: e.target.value })} title="Cor do texto" style={{ width: 30, height: 30, borderRadius: 6, border: "1px solid #ddd", cursor: "pointer", padding: 0, flexShrink: 0 }} />
      </div>
      <input value={d.mantra} onChange={(e) => setD({ ...d, mantra: e.target.value })} style={{ ...inputStyle, fontStyle: "italic" }} placeholder="Mantra" />
      <textarea value={d.desc} onChange={(e) => setD({ ...d, desc: e.target.value })} style={{ ...inputStyle, resize: "vertical", minHeight: 60 }} placeholder="Descrição" />
      <div style={{ display: "flex", gap: 6 }}>
        <button onClick={() => onSave(d)} style={{ flex: 1, background: "rgba(0,0,0,0.25)", color: "#fff", border: "none", borderRadius: 8, padding: "8px", fontWeight: 700, cursor: "pointer", fontSize: "0.8rem" }}>Salvar</button>
        <button onClick={onCancel} style={{ background: "rgba(255,255,255,0.2)", color: "#fff", border: "none", borderRadius: 8, padding: "8px 12px", cursor: "pointer", fontSize: "0.8rem" }}>Cancelar</button>
      </div>
    </div>
  );
}

export default function Valores() {
  const { data: pillars, setData: setPillars, reset: resetPillars } = useEditableData<Pillar[]>("pillars", defaultPillars);
  const { data: values, setData: setValues, reset: resetValues } = useEditableData<Value[]>("valores", defaultValues);
  const { isEditMode } = useEditMode();
  const [editingPillar, setEditingPillar] = useState<number | null>(null);
  const [editingValue, setEditingValue] = useState<number | null>(null);

  const updatePillar = (i: number, p: Pillar) => { setPillars(pillars.map((x, idx) => idx === i ? p : x)); setEditingPillar(null); };
  const updateValue  = (i: number, v: Value)  => { setValues(values.map((x, idx) => idx === i ? v : x));   setEditingValue(null);  };

  return (
    <section id="valores" style={{ background: "#f5f0e8", padding: "100px 40px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>

        <div className="dots reveal" style={{ marginBottom: 8 }} />
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 32, flexWrap: "wrap" }}>
          <span className="pill reveal reveal-delay-1" style={{ display: "inline-block" }}>PROPÓSITO E VALORES</span>
          {isEditMode && (
            <button
              onClick={() => { resetPillars(); resetValues(); }}
              style={{ background: "transparent", border: "1px solid #ccc", borderRadius: 8, padding: "4px 12px", fontSize: "0.72rem", color: "#999", cursor: "pointer" }}
            >
              ↺ Restaurar padrão
            </button>
          )}
        </div>

        {/* Quote card */}
        <div
          className="reveal reveal-delay-2"
          style={{ background: "#2659a5", borderRadius: 24, padding: "40px 48px", marginBottom: 48, position: "relative", overflow: "hidden" }}
        >
          <div style={{ position: "absolute", top: -20, right: -20, width: 160, height: 160, background: "rgba(215,217,0,0.08)", borderRadius: "50%" }} />
          <div style={{ position: "absolute", bottom: -40, left: -10, width: 120, height: 120, background: "rgba(255,255,255,0.04)", borderRadius: "50%" }} />
          <p style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: "clamp(17px, 2.2vw, 22px)", color: "#fff", lineHeight: 1.55, margin: "0 0 20px", maxWidth: 820, position: "relative" }}>
            &ldquo;Uma companhia brasileira de construção de marcas e negócios digitais campeões,
            obcecada por talento, execução, tecnologia, ambição e criação de valor de longo prazo.&rdquo;
          </p>
          <p style={{ color: "#d7d900", fontWeight: 600, fontSize: "0.85rem", margin: 0, letterSpacing: "0.05em", position: "relative" }}>
            — Rafa Lobo, Fundador
          </p>
        </div>

        {/* Three pillars */}
        <div className="reveal reveal-delay-3" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20, marginBottom: 72 }}>
          {pillars.map((p, i) =>
            isEditMode && editingPillar === i ? (
              <PillarEditor key={i} pillar={p} onSave={(v) => updatePillar(i, v)} onCancel={() => setEditingPillar(null)} />
            ) : (
              <div
                key={i}
                className="card-hover"
                style={{ background: "#fff", borderRadius: 20, padding: "28px 28px", borderTop: `5px solid ${p.accent}`, boxShadow: "0 4px 20px rgba(0,0,0,0.07)", position: "relative" }}
              >
                {isEditMode && (
                  <button
                    onClick={() => setEditingPillar(i)}
                    style={{ position: "absolute", top: 10, right: 10, background: "#2659a5", border: "none", borderRadius: 6, width: 26, height: 26, cursor: "pointer", color: "#fff", fontSize: "0.75rem", display: "flex", alignItems: "center", justifyContent: "center" }}
                  >
                    ✏
                  </button>
                )}
                <div style={{ color: p.accent, fontWeight: 800, fontSize: "1.3rem", marginBottom: 8 }}>{p.title}</div>
                <p style={{ color: "#555", fontSize: "0.9rem", margin: 0, lineHeight: 1.6 }}>{p.desc}</p>
              </div>
            )
          )}
        </div>

        {/* Values title */}
        <h2 className="reveal" style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 800, fontSize: "clamp(28px, 3.5vw, 44px)", color: "#2659a5", margin: "0 0 36px" }}>
          5 Valores que nos definem
        </h2>

        {/* Values grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 20 }}>
          {values.map((v, i) =>
            isEditMode && editingValue === i ? (
              <ValueEditor key={i} value={v} onSave={(val) => updateValue(i, val)} onCancel={() => setEditingValue(null)} />
            ) : (
              <div
                key={i}
                className={`card-hover reveal reveal-delay-${i + 1}`}
                style={{ background: v.bg, borderRadius: 24, padding: "36px 28px", boxShadow: "0 4px 24px rgba(0,0,0,0.1)", position: "relative", overflow: "hidden" }}
              >
                <div style={{ position: "absolute", bottom: -30, right: -30, width: 100, height: 100, background: "rgba(0,0,0,0.07)", borderRadius: "50%" }} />
                {isEditMode && (
                  <button
                    onClick={() => setEditingValue(i)}
                    style={{ position: "absolute", top: 10, right: 10, background: "rgba(0,0,0,0.25)", border: "none", borderRadius: 6, width: 26, height: 26, cursor: "pointer", color: "#fff", fontSize: "0.75rem", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 2 }}
                  >
                    ✏
                  </button>
                )}
                <h3 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 800, fontSize: "clamp(18px, 2vw, 24px)", color: v.textColor, margin: "0 0 8px", lineHeight: 1.2, position: "relative" }}>
                  {v.title}
                </h3>
                <p style={{ color: v.textColor, fontWeight: 600, fontSize: "0.8rem", opacity: 0.85, margin: "0 0 14px", fontStyle: "italic", letterSpacing: "0.02em", position: "relative" }}>
                  &ldquo;{v.mantra}&rdquo;
                </p>
                <p style={{ color: v.textColor, fontSize: "0.82rem", margin: 0, opacity: 0.9, lineHeight: 1.6, position: "relative" }}>
                  {v.desc}
                </p>
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
}
