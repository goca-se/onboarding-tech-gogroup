"use client";

import { useState, useCallback } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  BackgroundVariant,
  Handle,
  Position,
  MarkerType,
  type Node,
  type Edge,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { usePersistedFlow } from "@/hooks/usePersistedFlow";
import NodeEditorPanel from "@/components/NodeEditorPanel";

/* ─── Node Components ─── */
function LayerNode({ data }: { data: Record<string, unknown> }) {
  const bg = data.bg as string;
  const textColor = data.textColor as string;
  const items = data.items as Array<{ icon: string; name: string; desc: string }>;
  return (
    <div style={{ background: bg, borderRadius: 20, padding: "16px 20px", minWidth: 200, maxWidth: 250, fontFamily: "'Poppins', sans-serif", boxShadow: "0 4px 20px rgba(0,0,0,0.25)", border: data.isHub ? "3px solid #d7d900" : "none" }}>
      <Handle type="target" position={Position.Left}   style={{ background: bg, border: `2px solid ${textColor}66`, width: 10, height: 10 }} />
      <Handle type="target" position={Position.Top}    style={{ background: bg, border: `2px solid ${textColor}66`, width: 10, height: 10 }} />
      <Handle type="source" position={Position.Right}  style={{ background: bg, border: `2px solid ${textColor}66`, width: 10, height: 10 }} />
      <Handle type="source" position={Position.Bottom} style={{ background: bg, border: `2px solid ${textColor}66`, width: 10, height: 10 }} />
      <div style={{ fontSize: "0.58rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: textColor, opacity: 0.65, marginBottom: 10 }}>
        {data.isHub ? "🔴 HUB CENTRAL — " : ""}{data.layer as string}
      </div>
      {items.map((item) => (
        <div key={item.name} style={{ background: "rgba(0,0,0,0.14)", borderRadius: 10, padding: "8px 12px", marginBottom: 6 }}>
          <div style={{ fontWeight: 700, fontSize: "0.82rem", color: textColor }}>{item.icon} {item.name}</div>
          {item.desc && <div style={{ fontSize: "0.68rem", color: textColor, opacity: 0.8, lineHeight: 1.4, marginTop: 2 }}>{item.desc}</div>}
        </div>
      ))}
    </div>
  );
}

function ExceptionNode({ data }: { data: Record<string, unknown> }) {
  return (
    <div style={{ background: "rgba(20,20,40,0.95)", border: "2px dashed #d7d900", borderRadius: 18, padding: "14px 18px", minWidth: 190, fontFamily: "'Poppins', sans-serif" }}>
      <Handle type="target" position={Position.Left}   style={{ background: "#d7d900", width: 10, height: 10 }} />
      <Handle type="source" position={Position.Bottom} style={{ background: "#d7d900", width: 10, height: 10 }} />
      <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
        <span style={{ fontSize: "0.9rem" }}>⚠️</span>
        <span style={{ background: "#d7d900", color: "#2659a5", fontSize: "0.55rem", fontWeight: 700, padding: "2px 8px", borderRadius: 999, textTransform: "uppercase", letterSpacing: "0.08em" }}>FLUXO APARTADO</span>
      </div>
      <div style={{ fontWeight: 800, color: "#fff", fontSize: "0.88rem", marginBottom: 3 }}>{data.title as string}</div>
      <div style={{ fontSize: "0.68rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.5, marginBottom: 10 }}>{data.desc as string}</div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
        {(data.flow as string[]).map((step, i) => (
          <span key={step} style={{ display: "flex", alignItems: "center", gap: 3 }}>
            {i > 0 && <span style={{ color: "#d7d900", fontSize: "0.7rem" }}>→</span>}
            <span style={{ background: "rgba(215,217,0,0.15)", borderRadius: 6, padding: "2px 7px", fontSize: "0.66rem", color: "#fff", fontWeight: 600 }}>{step}</span>
          </span>
        ))}
      </div>
    </div>
  );
}

function CDNode({ data }: { data: Record<string, unknown> }) {
  const active = data.active as boolean;
  return (
    <div style={{ background: active ? "#fff" : "rgba(255,255,255,0.04)", border: `2px solid ${active ? "#2659a5" : "#555"}`, borderRadius: 12, padding: "9px 13px", minWidth: 140, fontFamily: "'Poppins', sans-serif", opacity: active ? 1 : 0.45 }}>
      <Handle type="target" position={Position.Top} style={{ background: active ? "#2659a5" : "#555", width: 8, height: 8 }} />
      <Handle type="source" position={Position.Bottom} style={{ background: active ? "#2659a5" : "#555", width: 8, height: 8 }} />
      <div style={{ fontWeight: 700, fontSize: "0.76rem", color: active ? "#2659a5" : "#888", textDecoration: active ? "none" : "line-through", marginBottom: 2 }}>
        {data.icon as string} {data.name as string}
      </div>
      <div style={{ fontSize: "0.64rem", color: "#777", lineHeight: 1.4 }}>{data.desc as string}</div>
    </div>
  );
}

const nodeTypes = { layer: LayerNode, exception: ExceptionNode, cd: CDNode };

const initialNodes: Node[] = [
  { id: "shopify", type: "layer", position: { x: 0, y: 60 },
    data: { layer: "Storefront", bg: "#3dbfef", textColor: "#fff",
      items: [{ icon: "🛒", name: "Shopify", desc: "Tema Liquid customizado por marca." }] } },
  { id: "yampi", type: "layer", position: { x: 0, y: 260 },
    data: { layer: "Checkout & Frete", bg: "#f8ae13", textColor: "#1a1a1a",
      items: [{ icon: "💳", name: "Yampi", desc: "Checkout headless + cotação de frete." }] } },
  { id: "mw", type: "layer", position: { x: 350, y: 160 },
    data: { layer: "Middleware v2", bg: "#e5381a", textColor: "#fff", isHub: true,
      items: [{ icon: "⚙️", name: "Middleware v2", desc: "Hub central de integração." }] } },
  { id: "protheus", type: "layer", position: { x: 350, y: 400 },
    data: { layer: "ERP Fiscal", bg: "#2659a5", textColor: "#fff",
      items: [{ icon: "📦", name: "Protheus (TOTVS)", desc: "Fiscal e financeiro do grupo." }] } },
  { id: "unilog", type: "layer", position: { x: 350, y: 580 },
    data: { layer: "WMS / Fulfillment", bg: "#1a2340", textColor: "#fff",
      items: [{ icon: "🏭", name: "Unilog", desc: "WMS — CDs Espírito Santo e Rio." }] } },
  { id: "intelipost", type: "layer", position: { x: 350, y: 760 },
    data: { layer: "Gestão de Frete", bg: "#0e3a4a", textColor: "#fff",
      items: [{ icon: "🚚", name: "Intelipost", desc: "Transportadoras e rastreio." }] } },
  { id: "cd-es", type: "cd", position: { x: 200, y: 940 }, data: { icon: "📦", name: "CD Espírito Santo", desc: "Principal — atende todo o Brasil", active: true } },
  { id: "cd-rj", type: "cd", position: { x: 380, y: 940 }, data: { icon: "📦", name: "CD Rio de Janeiro",  desc: "Atende região do Rio",            active: true } },
  { id: "cd-sp", type: "cd", position: { x: 560, y: 940 }, data: { icon: "📦", name: "CD São Paulo",       desc: "Descontinuado — motivos fiscais",  active: false } },
  { id: "crm", type: "layer", position: { x: 740, y: 60 },
    data: { layer: "CRM & Automações", bg: "#e61782", textColor: "#fff",
      items: [
        { icon: "💬", name: "Insider", desc: "Email, push, WhatsApp, jornadas." },
        { icon: "🔄", name: "N8N",     desc: "Automações e workflows." },
      ] } },
  { id: "analytics", type: "layer", position: { x: 740, y: 340 },
    data: { layer: "Analytics / BI", bg: "#7B4F8C", textColor: "#fff",
      items: [
        { icon: "📊", name: "GA4",      desc: "Tracking nativo no Shopify." },
        { icon: "📈", name: "Metabase", desc: "Dashboards via BigQuery." },
        { icon: "🔥", name: "Clarity",  desc: "Heatmaps por marca." },
      ] } },
  { id: "midia", type: "layer", position: { x: 740, y: 650 },
    data: { layer: "Mídia & Performance", bg: "#d7d900", textColor: "#2659a5",
      items: [
        { icon: "🔵", name: "Meta Ads",   desc: "Canal principal de aquisição." },
        { icon: "🟡", name: "Google Ads", desc: "Segundo canal relevante." },
      ] } },
  { id: "apice", type: "exception", position: { x: 1060, y: 200 },
    data: { title: "Exceção: Ápice", desc: "Não passa pelo Middleware v2.", flow: ["🛒 Shopify", "📦 Tiny", "🏭 Unilog"] } },
];

const mkEdge = (id: string, source: string, target: string, color: string, animated = false, label = ""): Edge => ({
  id, source, target, label, animated,
  style: { stroke: color, strokeWidth: animated ? 2.5 : 1.8 },
  markerEnd: { type: MarkerType.ArrowClosed, color },
  labelStyle: { fill: "#fff", fontSize: 9, fontFamily: "Poppins", fontWeight: 700 },
  labelBgStyle: { fill: "#1a2340", borderRadius: 6 },
  type: "smoothstep",
});

const initialEdges: Edge[] = [
  mkEdge("s→mw",  "shopify", "mw",  "#3dbfef", true),
  mkEdge("y→mw",  "yampi",   "mw",  "#f8ae13", true),
  mkEdge("mw→p",  "mw", "protheus",   "#2659a5", false, "fiscal"),
  mkEdge("mw→u",  "mw", "unilog",     "#3dbfef66", false, "WMS"),
  mkEdge("mw→i",  "mw", "intelipost", "#3dbfefaa", false, "frete"),
  mkEdge("u→es",  "unilog", "cd-es",  "#3dbfef88"),
  mkEdge("u→rj",  "unilog", "cd-rj",  "#3dbfef88"),
  mkEdge("u→sp",  "unilog", "cd-sp",  "#55555566"),
  mkEdge("s→crm", "shopify", "crm",   "#e61782aa"),
  mkEdge("y→crm", "yampi",   "crm",   "#e61782aa"),
  mkEdge("mw→crm","mw",      "crm",   "#e61782",   false, "eventos"),
  mkEdge("s→an",  "shopify",  "analytics", "#7B4F8Caa"),
  mkEdge("y→an",  "yampi",    "analytics", "#7B4F8Caa"),
  mkEdge("mw→an", "mw",       "analytics", "#7B4F8C",   false, "dados"),
  mkEdge("p→an",  "protheus", "analytics", "#7B4F8Caa", false, "ERP"),
  mkEdge("s→md",  "shopify", "midia", "#d7d900aa"),
  mkEdge("y→md",  "yampi",   "midia", "#d7d900aa"),
];

const layerLegend = [
  { color: "#3dbfef", label: "Storefront (Shopify)" },
  { color: "#f8ae13", label: "Checkout (Yampi)" },
  { color: "#e5381a", label: "Middleware v2 — hub" },
  { color: "#2659a5", label: "Ops (Protheus / Unilog)" },
  { color: "#e61782", label: "CRM ← Shop + Yampi + MW" },
  { color: "#7B4F8C", label: "Analytics ← Shop+Yampi+MW+ERP" },
  { color: "#d7d900", label: "Mídia ← Shop + Yampi" },
];

export default function Stack() {
  const { nodes, setNodes, onNodesChange, edges, onEdgesChange, onConnect, resetFlow, ready } =
    usePersistedFlow("stack", initialNodes, initialEdges);

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

  return (
    <section id="stack" style={{ background: "#2659a5", padding: "80px 0 0" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 40px 40px" }}>
        <div className="dots reveal" />
        <span className="pill reveal reveal-delay-1" style={{ marginBottom: 16, display: "inline-block" }}>ARQUITETURA</span>
        <h2 className="reveal reveal-delay-2" style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 800, fontSize: "clamp(28px, 3.5vw, 48px)", color: "#d7d900", margin: "0 0 12px" }}>
          Nossa Stack Técnica
        </h2>
        <p className="reveal reveal-delay-3" style={{ color: "rgba(255,255,255,0.7)", marginBottom: 8, fontSize: "1rem", maxWidth: 580 }}>
          Arquitetura multi-marca — do storefront ao ERP. Ops só se conectam ao Middleware.
        </p>
        <p style={{ color: "rgba(215,217,0,0.7)", fontSize: "0.8rem", marginBottom: 0, fontWeight: 600 }}>
          Arraste · Zoom · Pan · Duplo clique para editar · Delete/Backspace para excluir selecionado
        </p>
      </div>

      <div style={{ height: 820, background: "#111827", position: "relative", opacity: ready ? 1 : 0, transition: "opacity 0.15s ease" }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeDoubleClick={onNodeDoubleClick}
          nodeTypes={nodeTypes}
          fitView
          fitViewOptions={{ padding: 0.1 }}
          minZoom={0.18}
          maxZoom={2.5}
          deleteKeyCode={["Backspace", "Delete"]}
          defaultEdgeOptions={{ type: "smoothstep" }}
        >
          <Background color="#d7d90010" gap={32} variant={BackgroundVariant.Dots} />
          <Controls style={{ background: "#2659a5", borderRadius: 12, border: "2px solid #d7d900" }} />
          <MiniMap
            nodeColor={(n) => (n.data as Record<string, unknown>).bg as string || "#2659a5"}
            style={{ background: "#111827", border: "2px solid #d7d900", borderRadius: 12 }}
          />
        </ReactFlow>

        {/* Legend */}
        <div style={{ position: "absolute", top: 16, left: 16, background: "rgba(0,0,0,0.78)", borderRadius: 12, padding: "12px 16px", fontSize: "0.67rem", color: "#fff", backdropFilter: "blur(8px)", zIndex: 10, maxWidth: 230 }}>
          <div style={{ fontWeight: 700, marginBottom: 8, color: "#d7d900", letterSpacing: "0.06em", textTransform: "uppercase" }}>Legenda de Conexões</div>
          {layerLegend.map(l => (
            <div key={l.label} style={{ display: "flex", alignItems: "flex-start", gap: 6, marginBottom: 5 }}>
              <div style={{ width: 10, height: 10, borderRadius: 3, background: l.color, flexShrink: 0, marginTop: 2 }} />
              <span style={{ lineHeight: 1.35 }}>{l.label}</span>
            </div>
          ))}
          <button
            onClick={resetFlow}
            style={{ marginTop: 10, width: "100%", background: "rgba(215,217,0,0.15)", border: "1px solid rgba(215,217,0,0.3)", borderRadius: 8, padding: "6px", color: "#d7d900", fontSize: "0.65rem", cursor: "pointer", fontFamily: "'Poppins', sans-serif", fontWeight: 600 }}
          >
            ↺ Restaurar Layout
          </button>
        </div>

        {/* Node editor panel */}
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
