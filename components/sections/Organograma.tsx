"use client";

import { useState, useCallback } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  BackgroundVariant,
  type Node,
  type Edge,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { usePersistedFlow } from "@/hooks/usePersistedFlow";
import NodeEditorPanel from "@/components/NodeEditorPanel";
import { useBrand } from "@/context/BrandContext";
import { BrandSelector } from "@/components/BrandSelector";

/* ─── Custom Nodes ─── */
function SetorNode({ data }: { data: Record<string, string> }) {
  return (
    <div style={{ background: "#fff", border: `3px solid ${data.color}`, borderRadius: 16, padding: "12px 16px", minWidth: 155, maxWidth: 210, boxShadow: "0 4px 16px rgba(0,0,0,0.1)", fontFamily: "'Poppins', sans-serif" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
        <span style={{ fontSize: "1.1rem" }}>{data.icon}</span>
        <span style={{ fontWeight: 700, fontSize: "0.82rem", color: "#1a1a1a" }}>{data.label}</span>
      </div>
      <p style={{ fontSize: "0.68rem", color: "#777", margin: 0, lineHeight: 1.45 }}>{data.contrib}</p>
    </div>
  );
}

function TechHubNode({ data }: { data: Record<string, string> }) {
  return (
    <div style={{ background: data.bg || "#2659a5", border: `4px solid ${data.border || "#d7d900"}`, borderRadius: 24, padding: "20px 28px", minWidth: 180, textAlign: "center", boxShadow: "0 8px 32px rgba(38,89,165,0.5)", fontFamily: "'Poppins', sans-serif" }}>
      <div style={{ fontSize: "1.8rem", marginBottom: 6 }}>{data.icon}</div>
      <div style={{ fontWeight: 800, fontSize: "1rem", color: "#fff", lineHeight: 1.2 }}>{data.label}</div>
      {data.sub && (
        <div style={{ color: "#d7d900", fontSize: "0.62rem", fontWeight: 600, marginTop: 4, letterSpacing: "0.08em", textTransform: "uppercase" }}>{data.sub}</div>
      )}
    </div>
  );
}

function OutroTimeNode({ data }: { data: Record<string, string> }) {
  return (
    <div style={{ background: "#1a2340", border: "2px solid rgba(255,255,255,0.25)", borderRadius: 20, padding: "16px 20px", minWidth: 200, fontFamily: "'Poppins', sans-serif" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
        <span style={{ fontSize: "1.1rem" }}>{data.icon}</span>
        <span style={{ fontWeight: 700, color: "#fff", fontSize: "0.9rem" }}>{data.label}</span>
      </div>
      <div style={{ display: "inline-block", background: "rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.65)", fontSize: "0.58rem", fontWeight: 700, padding: "2px 8px", borderRadius: 999, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 6 }}>OUTRO TIME</div>
      <p style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.65)", margin: 0, lineHeight: 1.5 }}>{data.contrib}</p>
    </div>
  );
}

function MarketplaceNode({ data }: { data: Record<string, string> }) {
  return (
    <div style={{ background: "#f5f5f5", border: "2px dashed #bbb", borderRadius: 16, padding: "12px 16px", minWidth: 160, fontFamily: "'Poppins', sans-serif" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
        <span style={{ fontSize: "1rem" }}>🛍️</span>
        <span style={{ fontWeight: 700, fontSize: "0.82rem", color: "#555" }}>{data.label}</span>
      </div>
      <div style={{ display: "inline-block", background: "#e8e8e8", color: "#666", fontSize: "0.58rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", padding: "2px 8px", borderRadius: 999, marginBottom: 6 }}>GERIDO POR TERCEIROS</div>
      <p style={{ fontSize: "0.68rem", color: "#888", margin: 0, lineHeight: 1.45 }}>{data.contrib}</p>
    </div>
  );
}

const nodeTypes = { setor: SetorNode, hub: TechHubNode, outrotime: OutroTimeNode, marketplace: MarketplaceNode };

/* ─── Gobeaute org data ─── */
const gbInitialNodes: Node[] = [
  { id: "hub-gobeaute", type: "hub", position: { x: 240, y: 320 },
    data: { icon: "💄", label: "Tech Gobeaute", sub: "Hub Central", bg: "#e61782", border: "#d7d900" } },
  { id: "growth",     type: "setor", position: { x: -180, y: 0 },
    data: { icon: "📈", label: "Growth",         color: "#e5381a", contrib: "GA4, A/B tests, CRO, Meta & Google Ads" } },
  { id: "marketing",  type: "setor", position: { x: -180, y: 140 },
    data: { icon: "📣", label: "Marketing",      color: "#e61782", contrib: "Pedidos de influencers, cupons e conteúdo" } },
  { id: "cx",         type: "setor", position: { x: -180, y: 280 },
    data: { icon: "🎧", label: "CX / CS",        color: "#3dbfef", contrib: "Dados de pedidos, automações de atendimento" } },
  { id: "operacoes",  type: "setor", position: { x: -180, y: 420 },
    data: { icon: "📦", label: "Operações",      color: "#f8ae13", contrib: "Middleware v2, Unilog, Intelipost" } },
  { id: "supply",     type: "setor", position: { x: -180, y: 560 },
    data: { icon: "🔄", label: "Supply",         color: "#4a7c59", contrib: "Sincronização e controle de estoque" } },
  { id: "fiscal",     type: "setor", position: { x: -180, y: 700 },
    data: { icon: "🧾", label: "Fiscal",         color: "#8B4513", contrib: "Middleware → Protheus (NF, tributário)" } },
  { id: "financeiro", type: "setor", position: { x: -180, y: 840 },
    data: { icon: "💰", label: "Financeiro",     color: "#4a7c59", contrib: "Protheus, conciliação, relatórios" } },
  { id: "b2b",        type: "setor", position: { x: 240, y: -80 },
    data: { icon: "💼", label: "B2B",            color: "#C17B2E", contrib: "Canais alternativos, integrações externas" } },
  { id: "bi",         type: "setor", position: { x: 660, y: 0 },
    data: { icon: "📊", label: "BI / Dados",     color: "#7B4F8C", contrib: "GA4 → BigQuery → Metabase, pipelines" } },
  { id: "people",     type: "setor", position: { x: 660, y: 140 },
    data: { icon: "👥", label: "People",         color: "#d7d900", contrib: "Automações internas e suporte pontual" } },
  { id: "devprod",    type: "setor", position: { x: 660, y: 280 },
    data: { icon: "🔬", label: "Dev. Produto",   color: "#e5273c", contrib: "Automações Shopify, rebranding" } },
  { id: "gocase-time", type: "outrotime", position: { x: 660, y: 440 },
    data: { icon: "🎒", label: "Gocase",
      contrib: "Outro time de Tech com operação própria em Extrema/MG — site interno, sistemas independentes." } },
  { id: "marketplace", type: "marketplace", position: { x: 240, y: 640 },
    data: { label: "Marketplace", contrib: "ML, TikTok Shop, Amazon, Shopee — Bling ERP" } },
];

const E = (id: string, source: string, target: string, color: string, animated = false): Edge => ({
  id, source, target, animated,
  style: { stroke: color, strokeWidth: 2 },
  type: "smoothstep",
});

const gbInitialEdges: Edge[] = [
  E("e-b2b",        "b2b",        "hub-gobeaute", "#C17B2E", true),
  E("e-growth",     "growth",     "hub-gobeaute", "#e5381a", true),
  E("e-marketing",  "marketing",  "hub-gobeaute", "#e61782", true),
  E("e-cx",         "cx",         "hub-gobeaute", "#3dbfef", true),
  E("e-operacoes",  "operacoes",  "hub-gobeaute", "#f8ae13", true),
  E("e-supply",     "supply",     "hub-gobeaute", "#4a7c59", true),
  E("e-fiscal",     "fiscal",     "hub-gobeaute", "#8B4513", true),
  E("e-financeiro", "financeiro", "hub-gobeaute", "#4a7c59", true),
  E("e-bi",         "hub-gobeaute", "bi",         "#7B4F8C", true),
  E("e-people",     "hub-gobeaute", "people",     "#d7d900", true),
  E("e-devprod",    "hub-gobeaute", "devprod",    "#e5273c", true),
  E("e-marketplace","marketplace", "hub-gobeaute","#bbb"),
];

/* ─── Gocase org data ─── */
const gcInitialNodes: Node[] = [
  { id: "hub-gocase", type: "hub", position: { x: 240, y: 320 },
    data: { icon: "🎒", label: "Tech Gocase", sub: "Hub Central", bg: "#E8403A", border: "#d7d900" } },
  { id: "gc-design",    type: "setor", position: { x: -180, y: 0 },
    data: { icon: "🎨", label: "Design / UX",    color: "#9B59B6", contrib: "Interfaces, configurador de produtos e experiência de compra" } },
  { id: "gc-marketing", type: "setor", position: { x: -180, y: 140 },
    data: { icon: "📣", label: "Marketing",      color: "#e61782", contrib: "Campanhas globais, influencers, cupons e conteúdo de marca" } },
  { id: "gc-cx",        type: "setor", position: { x: -180, y: 280 },
    data: { icon: "🎧", label: "CX / CS",        color: "#3dbfef", contrib: "Atendimento, dados de pedidos e automações de pós-venda" } },
  { id: "gc-ops",       type: "setor", position: { x: -180, y: 420 },
    data: { icon: "🏭", label: "Produção / Ops", color: "#f8ae13", contrib: "Fábrica em Extrema/MG, produção e expedição de pedidos" } },
  { id: "gc-supply",    type: "setor", position: { x: -180, y: 560 },
    data: { icon: "🔄", label: "Supply Chain",   color: "#4a7c59", contrib: "Estoque de matéria-prima e SKUs personalizados" } },
  { id: "gc-inter",     type: "setor", position: { x: -180, y: 700 },
    data: { icon: "🌍", label: "Expansão",        color: "#2980b9", contrib: "Novos canais, parcerias e integrações externas" } },
  { id: "gc-fiscal",    type: "setor", position: { x: -180, y: 840 },
    data: { icon: "💰", label: "Fiscal / Fin.",  color: "#8B4513", contrib: "Protheus (TOTVS), conciliação e relatórios do grupo" } },
  { id: "gc-b2c",       type: "setor", position: { x: 240, y: -80 },
    data: { icon: "🛍️", label: "B2C / Loja",    color: "#E8403A", contrib: "Site gocase.com.br e app — jornada de compra e CRO" } },
  { id: "gc-bi",        type: "setor", position: { x: 660, y: 0 },
    data: { icon: "📊", label: "BI / Dados",     color: "#7B4F8C", contrib: "GA4 → BigQuery → Metabase, KPIs de personalização" } },
  { id: "gc-people",    type: "setor", position: { x: 660, y: 140 },
    data: { icon: "👥", label: "People",         color: "#d7d900", contrib: "Automações internas, onboarding e suporte pontual" } },
  { id: "gc-produto",   type: "setor", position: { x: 660, y: 280 },
    data: { icon: "💎", label: "Produto Digital",color: "#e5273c", contrib: "Features do configurador, app e plataforma de compra" } },
  { id: "gobeaute-time", type: "outrotime", position: { x: 660, y: 440 },
    data: { icon: "💄", label: "Gobeaute",
      contrib: "Outro time de Tech com 7 marcas de beleza DTC — sistemas e stack próprios." } },
  { id: "gc-marketplace", type: "marketplace", position: { x: 240, y: 640 },
    data: { label: "Marketplace", contrib: "ML, TikTok Shop, Amazon, Shopee — gestão própria" } },
];

const gcInitialEdges: Edge[] = [
  E("gc-b2c",        "gc-b2c",       "hub-gocase",  "#E8403A", true),
  E("gc-design",     "gc-design",    "hub-gocase",  "#9B59B6", true),
  E("gc-marketing",  "gc-marketing", "hub-gocase",  "#e61782", true),
  E("gc-cx",         "gc-cx",        "hub-gocase",  "#3dbfef", true),
  E("gc-ops",        "gc-ops",       "hub-gocase",  "#f8ae13", true),
  E("gc-supply",     "gc-supply",    "hub-gocase",  "#4a7c59", true),
  E("gc-inter",      "gc-inter",     "hub-gocase",  "#2980b9", true),
  E("gc-fiscal",     "gc-fiscal",    "hub-gocase",  "#8B4513", true),
  E("gc-bi",         "hub-gocase",   "gc-bi",       "#7B4F8C", true),
  E("gc-people",     "hub-gocase",   "gc-people",   "#d7d900", true),
  E("gc-produto",    "hub-gocase",   "gc-produto",  "#e5273c", true),
  E("gc-mkt",        "gc-marketplace","hub-gocase",  "#bbb"),
];

/* ─── Component ─── */
export default function Organograma() {
  const { brand } = useBrand();

  const gbFlow = usePersistedFlow("organograma-gobeaute", gbInitialNodes, gbInitialEdges);
  const gcFlow = usePersistedFlow("organograma-gocase",   gcInitialNodes, gcInitialEdges);

  const { nodes, setNodes, onNodesChange, edges, onEdgesChange, onConnect, resetFlow, ready } =
    brand === "gocase" ? gcFlow : gbFlow;

  const [editingNode, setEditingNode] = useState<Node | null>(null);

  const onNodeDoubleClick = useCallback((_: React.MouseEvent, node: Node) => {
    setEditingNode(node);
  }, []);

  const handleNodeEdit = useCallback(
    (id: string, data: Record<string, unknown>) => {
      setNodes((nds) => nds.map((n) => (n.id === id ? { ...n, data } : n)));
    },
    [setNodes]
  );

  const hubColor = brand === "gocase" ? "#E8403A" : "#e61782";
  const hubLabel = brand === "gocase" ? "Tech Gocase (hub)" : "Tech Gobeaute (hub)";
  const outroLabel = brand === "gocase" ? "Gobeaute (outro time)" : "Outro time (Gocase)";
  const brandLabel = brand === "gocase" ? "Gocase" : "Gobeaute";

  return (
    <section id="organograma" style={{ background: "#f5f0e8", padding: "80px 0 0" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 40px 40px" }}>
        <BrandSelector variant="light" />
        <div className="dots reveal" />
        <span className="pill reveal reveal-delay-1" style={{ marginBottom: 16, display: "inline-block" }}>ORGANOGRAMA</span>
        <h2 className="reveal reveal-delay-2" style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 800, fontSize: "clamp(28px, 3.5vw, 48px)", color: "#2659a5", margin: "0 0 12px" }}>
          Como o Time de Tech {brandLabel} se Conecta
        </h2>
        <p className="reveal reveal-delay-3" style={{ fontSize: "1rem", color: "#666", marginBottom: 8, fontWeight: 600, fontStyle: "italic" }}>
          Tech {brandLabel} trabalha <em>junto</em> com todos os setores — não para eles.
        </p>
        <p style={{ color: "#999", fontSize: "0.8rem", marginBottom: 0 }}>
          Arraste · Zoom · Pan · Duplo clique para editar · Delete/Backspace para excluir selecionado
        </p>
      </div>

      <div style={{ height: 700, background: "#1a2340", position: "relative", opacity: ready ? 1 : 0, transition: "opacity 0.15s ease" }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeDoubleClick={onNodeDoubleClick}
          nodeTypes={nodeTypes}
          fitView
          fitViewOptions={{ padding: 0.12 }}
          minZoom={0.25}
          maxZoom={2.5}
          deleteKeyCode={["Backspace", "Delete"]}
          defaultEdgeOptions={{ type: "smoothstep" }}
        >
          <Background color="#d7d90015" gap={28} variant={BackgroundVariant.Dots} />
          <Controls style={{ background: "#2659a5", borderRadius: 12, border: "2px solid #d7d900" }} />
          <MiniMap
            nodeColor={(n) => {
              if (n.type === "hub") return (n.data as Record<string,string>).bg || hubColor;
              if (n.type === "marketplace") return "#bbb";
              if (n.type === "outrotime") return "#2659a5";
              return (n.data as Record<string,string>).color || "#2659a5";
            }}
            style={{ background: "#111827", border: "2px solid #d7d900", borderRadius: 12 }}
          />
        </ReactFlow>

        {/* Legend */}
        <div style={{ position: "absolute", top: 16, left: 16, background: "rgba(0,0,0,0.75)", borderRadius: 12, padding: "12px 16px", fontSize: "0.7rem", color: "#fff", backdropFilter: "blur(8px)", zIndex: 10 }}>
          <div style={{ fontWeight: 700, marginBottom: 8, color: "#d7d900", letterSpacing: "0.06em", textTransform: "uppercase" }}>Legenda</div>
          {[
            { color: hubColor, label: hubLabel },
            { color: "#2659a5", label: outroLabel },
            { color: "#bbb",    label: "Marketplace (terceiros)" },
          ].map(l => (
            <div key={l.label} style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: l.color }} />
              {l.label}
            </div>
          ))}
          <button
            onClick={resetFlow}
            style={{ marginTop: 10, width: "100%", background: "rgba(215,217,0,0.15)", border: "1px solid rgba(215,217,0,0.3)", borderRadius: 8, padding: "6px", color: "#d7d900", fontSize: "0.65rem", cursor: "pointer", fontFamily: "'Poppins', sans-serif", fontWeight: 600 }}
          >
            ↺ Restaurar Layout
          </button>
        </div>

        {editingNode && (
          <NodeEditorPanel
            node={editingNode}
            onSave={handleNodeEdit}
            onClose={() => setEditingNode(null)}
          />
        )}
      </div>
    </section>
  );
}
