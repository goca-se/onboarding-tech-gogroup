"use client";

import { useState } from "react";
import { useEditableData } from "@/hooks/useEditableData";
import { useEditMode } from "@/context/EditModeContext";

const LOGO_TOKEN = "pk_X7-rxBQBQqmZkZzBIGhP1g";

interface Tool {
  name: string;
  subtitle?: string;
  url: string;
  logoDomain: string | null;
  initials: string;
  desc: string;
  category: string;
  color: string;
}

const defaultFerramenta: Tool[] = [
  {
    name: "Cosmos",
    subtitle: "Middleware v2",
    url: "https://cosmos.gobeaute.com.br",
    logoDomain: null,
    initials: "Co",
    desc: "Middleware interno entre Shopify, Yampi e Protheus. Camada central de dados e automações.",
    category: "Integração",
    color: "#e8843a",
  },
  {
    name: "Metabase",
    url: "https://metabase.gobeaute.com.br",
    logoDomain: "metabase.com",
    initials: "M",
    desc: "BI e dashboards operacionais — vendas, estoque, performance de campanhas.",
    category: "Analytics",
    color: "#2980b9",
  },
  {
    name: "CRO Roadmap",
    url: "https://gobeaute-cro-roadmap.vercel.app",
    logoDomain: null,
    initials: "CR",
    desc: "Ferramenta interna de gestão do roadmap de CRO — testes A/B, hipóteses e melhorias por marca.",
    category: "CRO",
    color: "#7B5EA7",
  },
  {
    name: "Google Analytics 4",
    url: "https://analytics.google.com",
    logoDomain: "google.com",
    initials: "GA",
    desc: "Funil de conversão, eventos de compra e performance de aquisição por marca e canal.",
    category: "Analytics",
    color: "#2980b9",
  },
  {
    name: "Jira",
    url: "https://gocase.atlassian.net",
    logoDomain: "atlassian.com",
    initials: "Ji",
    desc: "Gestão de sprints, tasks de dev, bugs e acompanhamento de entregas do time de Tech.",
    category: "Gestão",
    color: "#27ae60",
  },
  {
    name: "Shopify Admin",
    url: "https://admin.shopify.com",
    logoDomain: "shopify.com",
    initials: "Sh",
    desc: "Back-office das 7 lojas — produtos, metafields, metaobjetos, themes e configurações.",
    category: "E-commerce",
    color: "#c0392b",
  },
  {
    name: "Yampi",
    url: "https://app.yampi.com.br",
    logoDomain: "yampi.com.br",
    initials: "Y",
    desc: "Checkout das marcas do grupo. Pedidos, pagamentos e integração com o middleware.",
    category: "E-commerce",
    color: "#c0392b",
  },
  {
    name: "Confluence",
    url: "https://gocase.atlassian.net/wiki",
    logoDomain: "atlassian.com",
    initials: "Cf",
    desc: "Documentação técnica — arquitetura, processos, integrações e decisões do time.",
    category: "Documentação",
    color: "#7f8c8d",
  },
  {
    name: "Google Drive",
    url: "https://drive.google.com/drive/u/0/folders/1Z3sx1ecqS-WRomCHGaRxCCQlfw8XacfB",
    logoDomain: "drive.google.com",
    initials: "GD",
    desc: "Repositório oficial — briefings, análises de CRO, apresentações e docs de produto.",
    category: "Documentação",
    color: "#7f8c8d",
  },
  {
    name: "GitHub",
    url: "https://github.com/goca-se/",
    logoDomain: "github.com",
    initials: "GH",
    desc: "Versionamento de themes Shopify, scripts de automação e código do middleware.",
    category: "Desenvolvimento",
    color: "#1a1a18",
  },
];

const defaultLinks: Tool[] = [
  {
    name: "TeamGuide",
    url: "https://login.teamguide.app/org",
    logoDomain: "teamguide.app",
    initials: "TG",
    desc: "Plataforma de RH — trilhas de desenvolvimento, cursos, avaliações de desempenho (AVD) e gestão de carreira.",
    category: "RH & Carreira",
    color: "#e91e8c",
  },
  {
    name: "Universo GoGroup",
    url: "https://gocase.notion.site/Nosso-Universo-Gogroup-d8c0de5fb58b4e459839ae21e597a898",
    logoDomain: "notion.com",
    initials: "UG",
    desc: "Central de informações da empresa — cultura, benefícios, rituais, valores e tudo sobre o grupo.",
    category: "Cultura",
    color: "#d4a017",
  },
  {
    name: "GoService",
    url: "https://goservice.gocase.com.br",
    logoDomain: null,
    initials: "GS",
    desc: "Abertura de chamados internos — solicitações gerais, rituais e processos da companhia.",
    category: "Suporte Interno",
    color: "#546e7a",
  },
];

const allCategories = [
  { label: "Integração",      color: "#e8843a" },
  { label: "Analytics",       color: "#2980b9" },
  { label: "CRO",             color: "#7B5EA7" },
  { label: "Gestão",          color: "#27ae60" },
  { label: "E-commerce",      color: "#c0392b" },
  { label: "Documentação",    color: "#7f8c8d" },
  { label: "Desenvolvimento", color: "#1a1a18" },
  { label: "RH & Carreira",   color: "#e91e8c" },
  { label: "Cultura",         color: "#d4a017" },
  { label: "Suporte Interno", color: "#546e7a" },
];

/* ── Logo with img.logo.dev fallback ── */
function ToolLogo({ logoDomain, initials, color }: { logoDomain: string | null; initials: string; color: string }) {
  const [failed, setFailed] = useState(!logoDomain);
  const src = logoDomain ? `https://img.logo.dev/${logoDomain}?token=${LOGO_TOKEN}&size=64&format=png` : null;

  if (failed || !src) {
    return (
      <div
        style={{
          width: 44,
          height: 44,
          borderRadius: 10,
          background: color,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "'DM Sans', sans-serif",
          fontWeight: 700,
          color: "#fff",
          fontSize: initials.length > 2 ? "0.7rem" : initials.length === 2 ? "0.88rem" : "1.1rem",
          flexShrink: 0,
          letterSpacing: "-0.02em",
        }}
      >
        {initials}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt=""
      width={44}
      height={44}
      onError={() => setFailed(true)}
      style={{
        width: 44,
        height: 44,
        borderRadius: 10,
        objectFit: "contain",
        background: "#fff",
        border: "1px solid #ebe8e3",
        flexShrink: 0,
      }}
    />
  );
}

/* ── Shared card ── */
function ToolCard({
  tool,
  onEdit,
  onDelete,
  showEdit,
}: {
  tool: Tool;
  onEdit?: () => void;
  onDelete?: () => void;
  showEdit: boolean;
}) {
  return (
    <a
      href={tool.url}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: "block",
        background: "#fff",
        borderRadius: 16,
        borderTop: `4px solid ${tool.color}`,
        padding: "18px 20px",
        textDecoration: "none",
        boxShadow: "0 1px 6px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.04)",
        transition: "transform 0.18s ease, box-shadow 0.18s ease",
        position: "relative",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-4px)";
        (e.currentTarget as HTMLAnchorElement).style.boxShadow = `0 8px 28px ${tool.color}22, 0 2px 8px rgba(0,0,0,0.08)`;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)";
        (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 1px 6px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.04)";
      }}
    >
      {/* Edit controls */}
      {showEdit && (
        <div
          style={{ position: "absolute", top: 10, right: 10, display: "flex", gap: 4, zIndex: 2 }}
          onClick={(e) => e.preventDefault()}
        >
          <button
            onClick={onEdit}
            style={{ background: "#2659a5", border: "none", borderRadius: 5, width: 24, height: 24, cursor: "pointer", color: "#fff", fontSize: "0.7rem", display: "flex", alignItems: "center", justifyContent: "center" }}
          >✏</button>
          <button
            onClick={onDelete}
            style={{ background: "#e5381a", border: "none", borderRadius: 5, width: 24, height: 24, cursor: "pointer", color: "#fff", fontSize: "0.7rem", display: "flex", alignItems: "center", justifyContent: "center" }}
          >✕</button>
        </div>
      )}

      {/* Header row */}
      <div style={{ display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 12 }}>
        <ToolLogo logoDomain={tool.logoDomain} initials={tool.initials} color={tool.color} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 6 }}>
            <div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: "0.92rem", color: "#1a1a1a", lineHeight: 1.3 }}>
                {tool.name}
              </div>
              {tool.subtitle && (
                <div style={{ fontSize: "0.68rem", color: "#aaa", fontFamily: "'DM Sans', sans-serif", marginTop: 1 }}>
                  {tool.subtitle}
                </div>
              )}
            </div>
            <span style={{ color: "#ccc", fontSize: "0.8rem", flexShrink: 0, marginTop: 2 }}>↗</span>
          </div>
          <div style={{ marginTop: 6 }}>
            <span
              style={{
                display: "inline-block",
                background: `${tool.color}15`,
                color: tool.color,
                fontSize: "0.58rem",
                fontWeight: 700,
                letterSpacing: "0.09em",
                textTransform: "uppercase",
                padding: "2px 8px",
                borderRadius: 999,
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              {tool.category}
            </span>
          </div>
        </div>
      </div>

      {/* Description */}
      <p style={{ fontSize: "0.77rem", color: "#777", margin: 0, lineHeight: 1.65, fontFamily: "'DM Sans', sans-serif" }}>
        {tool.desc}
      </p>
    </a>
  );
}

/* ── Inline editor ── */
function ToolEditor({ tool, onSave, onCancel }: { tool: Tool; onSave: (t: Tool) => void; onCancel: () => void }) {
  const [d, setD] = useState({ ...tool });
  const inp: React.CSSProperties = { width: "100%", padding: "7px 10px", borderRadius: 8, border: "1px solid #ddd", fontFamily: "'DM Sans', sans-serif", fontSize: "0.82rem", boxSizing: "border-box" };
  return (
    <div style={{ background: "#fff", borderRadius: 16, borderTop: `4px solid ${d.color}`, padding: "18px 20px", display: "flex", flexDirection: "column", gap: 8 }}>
      <div style={{ display: "flex", gap: 6 }}>
        <input value={d.name} onChange={(e) => setD({ ...d, name: e.target.value })} style={{ ...inp, flex: 1, fontWeight: 700 }} placeholder="Nome" />
        <input type="color" value={d.color} onChange={(e) => setD({ ...d, color: e.target.value })} style={{ width: 34, height: 34, borderRadius: 6, border: "1px solid #ddd", cursor: "pointer", padding: 2, flexShrink: 0 }} />
      </div>
      <input value={d.subtitle ?? ""} onChange={(e) => setD({ ...d, subtitle: e.target.value })} style={inp} placeholder="Subtítulo (opcional)" />
      <input value={d.url} onChange={(e) => setD({ ...d, url: e.target.value })} style={inp} placeholder="URL" />
      <input value={d.logoDomain ?? ""} onChange={(e) => setD({ ...d, logoDomain: e.target.value || null })} style={inp} placeholder="Logo domain (ex: shopify.com) ou deixe vazio" />
      <input value={d.initials} onChange={(e) => setD({ ...d, initials: e.target.value })} style={{ ...inp, width: 80 }} placeholder="Iniciais" />
      <input value={d.category} onChange={(e) => setD({ ...d, category: e.target.value })} style={inp} placeholder="Categoria" />
      <textarea value={d.desc} onChange={(e) => setD({ ...d, desc: e.target.value })} style={{ ...inp, resize: "vertical", minHeight: 56 }} placeholder="Descrição" />
      <div style={{ display: "flex", gap: 6 }}>
        <button onClick={() => onSave(d)} style={{ flex: 1, background: "#2659a5", color: "#fff", border: "none", borderRadius: 8, padding: "8px", fontWeight: 700, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>Salvar</button>
        <button onClick={onCancel} style={{ background: "#f0f0f0", color: "#666", border: "none", borderRadius: 8, padding: "8px 12px", cursor: "pointer" }}>Cancelar</button>
      </div>
    </div>
  );
}

/* ── Grid with edit support ── */
function ToolGrid({
  tools,
  onUpdate,
  isEditMode,
  onAdd,
}: {
  tools: Tool[];
  onUpdate: (updated: Tool[]) => void;
  isEditMode: boolean;
  onAdd: () => void;
}) {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const save = (i: number, t: Tool) => { onUpdate(tools.map((x, idx) => (idx === i ? t : x))); setEditingIndex(null); };
  const del  = (i: number)           => { onUpdate(tools.filter((_, idx) => idx !== i)); };

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 16 }}>
      {tools.map((tool, i) =>
        isEditMode && editingIndex === i ? (
          <ToolEditor key={i} tool={tool} onSave={(t) => save(i, t)} onCancel={() => setEditingIndex(null)} />
        ) : (
          <ToolCard
            key={i}
            tool={tool}
            showEdit={isEditMode}
            onEdit={() => setEditingIndex(i)}
            onDelete={() => del(i)}
          />
        )
      )}
      {isEditMode && (
        <button
          onClick={onAdd}
          style={{ background: "transparent", border: "2px dashed #c8c4bb", borderRadius: 16, padding: "18px", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 6, color: "#bbb", fontSize: "0.82rem", minHeight: 100, fontFamily: "'DM Sans', sans-serif" }}
        >
          <span style={{ fontSize: "1.5rem", lineHeight: 1 }}>+</span>
          Adicionar
        </button>
      )}
    </div>
  );
}

/* ── Main section ── */
export default function Ferramentas() {
  const { data: ferrs, setData: setFerrs, reset: resetFerrs } = useEditableData<Tool[]>("ferrs-v2", defaultFerramenta);
  const { data: links, setData: setLinks, reset: resetLinks } = useEditableData<Tool[]>("links-v2", defaultLinks);
  const { isEditMode } = useEditMode();

  const addTool = (list: Tool[], setList: (t: Tool[]) => void) =>
    setList([...list, { name: "Novo Link", url: "#", logoDomain: null, initials: "??", desc: "Descrição", category: "Integração", color: "#2659a5" }]);

  return (
    <section id="ferramentas" style={{ background: "#f0eee9", padding: "100px 40px 80px" }}>
      <div style={{ maxWidth: 1140, margin: "0 auto" }}>

        {/* Header */}
        <div className="dots reveal" />
        <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap", marginBottom: 4 }}>
          <span className="pill reveal reveal-delay-1" style={{ display: "inline-block" }}>FERRAMENTAS &amp; LINKS</span>
          {isEditMode && (
            <button
              onClick={() => { resetFerrs(); resetLinks(); }}
              style={{ background: "transparent", border: "1px solid #ccc", borderRadius: 8, padding: "4px 12px", fontSize: "0.72rem", color: "#999", cursor: "pointer" }}
            >
              ↺ Restaurar padrão
            </button>
          )}
        </div>
        <h2
          className="reveal reveal-delay-2"
          style={{ fontFamily: "'DM Serif Display', serif", fontWeight: 400, fontSize: "clamp(28px, 3.5vw, 48px)", color: "#1a1a1a", margin: "14px 0 8px", lineHeight: 1.1 }}
        >
          Ferramentas &amp; Links do Time
        </h2>
        <p
          className="reveal reveal-delay-3"
          style={{ fontFamily: "'DM Sans', sans-serif", color: "#888", fontSize: "0.95rem", margin: "0 0 40px", maxWidth: 520, lineHeight: 1.7 }}
        >
          Sistemas internos, plataformas e acessos que você vai usar no dia a dia.
        </p>

        {/* Sub-label */}
        <div style={{ marginBottom: 20 }}>
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: "0.7rem", color: "#2659a5", letterSpacing: "0.1em", textTransform: "uppercase" }}>
            FERRAMENTAS TECH GOBEAUTE
          </span>
        </div>

        {/* Grid 1 */}
        <ToolGrid
          tools={ferrs}
          onUpdate={setFerrs}
          isEditMode={isEditMode}
          onAdd={() => addTool(ferrs, setFerrs)}
        />

        {/* Divider */}
        <div style={{ display: "flex", alignItems: "center", gap: 16, margin: "52px 0 40px" }}>
          <div style={{ flex: 1, height: 1, background: "#e4e0d8" }} />
          <span
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "11px",
              color: "#aaa",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              whiteSpace: "nowrap",
            }}
          >
            Links Chave · GoGroup
          </span>
          <div style={{ flex: 1, height: 1, background: "#e4e0d8" }} />
        </div>

        {/* Grid 2 */}
        <ToolGrid
          tools={links}
          onUpdate={setLinks}
          isEditMode={isEditMode}
          onAdd={() => addTool(links, setLinks)}
        />

        {/* Legend */}
        <div
          style={{
            marginTop: 48,
            paddingTop: 28,
            borderTop: "1px solid #e4e0d8",
            display: "flex",
            flexWrap: "wrap",
            gap: "8px 24px",
            alignItems: "center",
          }}
        >
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.65rem", color: "#bbb", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", marginRight: 4 }}>
            Categorias
          </span>
          {allCategories.map((c) => (
            <div key={c.label} style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <div style={{ width: 7, height: 7, borderRadius: "50%", background: c.color, flexShrink: 0 }} />
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.72rem", color: "#999" }}>{c.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
