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
function PersonNode({ data }: { data: Record<string, unknown> }) {
  const isMe = data.isMe as boolean;
  const color = data.color as string;
  return (
    <div style={{
      background: "#fff",
      border: `2px solid ${isMe ? color : "#e8e8e8"}`,
      borderTop: `4px solid ${color}`,
      borderRadius: 14,
      padding: "14px 16px",
      minWidth: 170,
      maxWidth: 210,
      fontFamily: "'DM Sans', sans-serif",
      boxShadow: isMe ? `0 4px 24px ${color}30` : "0 2px 12px rgba(0,0,0,0.08)",
      position: "relative",
    }}>
      <Handle type="target" position={Position.Top}    style={{ background: color, width: 8, height: 8 }} />
      <Handle type="source" position={Position.Bottom} style={{ background: color, width: 8, height: 8 }} />
      {isMe && (
        <span style={{ position: "absolute", top: -12, right: 10, background: color, color: "#fff", fontSize: "0.55rem", fontWeight: 700, padding: "2px 8px", borderRadius: 999, letterSpacing: "0.1em", textTransform: "uppercase" }}>
          VOCÊ
        </span>
      )}
      <div style={{ fontWeight: 700, fontSize: "0.88rem", color: "#1a1a1a", marginBottom: 3 }}>{data.name as string}</div>
      <div style={{ fontSize: "0.72rem", color: color, fontWeight: 600, marginBottom: 2 }}>{data.role as string}</div>
      <div style={{ fontSize: "0.68rem", color: "#999" }}>{data.dept as string}</div>
    </div>
  );
}

function HeadNode({ data }: { data: Record<string, unknown> }) {
  const color = data.color as string;
  return (
    <div style={{
      background: "#fff",
      border: `2px solid ${color}`,
      borderTop: `5px solid ${color}`,
      borderRadius: 16,
      padding: "18px 24px",
      minWidth: 220,
      textAlign: "center",
      fontFamily: "'DM Sans', sans-serif",
      boxShadow: "0 4px 24px rgba(0,0,0,0.12)",
    }}>
      <Handle type="source" position={Position.Bottom} style={{ background: color, width: 10, height: 10 }} />
      <div style={{ fontSize: "1.8rem", marginBottom: 6 }}>🧑‍💻</div>
      <div style={{ fontWeight: 700, fontSize: "1rem", color: "#1a1a1a", marginBottom: 3 }}>{data.name as string}</div>
      <div style={{ fontSize: "0.72rem", color: color, fontWeight: 600, marginBottom: 2 }}>{data.role as string}</div>
      <div style={{ fontSize: "0.65rem", background: `${color}18`, color: color, padding: "2px 10px", borderRadius: 999, display: "inline-block", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}>
        {data.dept as string}
      </div>
    </div>
  );
}

function BlockHeaderNode({ data }: { data: Record<string, unknown> }) {
  const color = data.color as string;
  return (
    <div style={{ background: `${color}15`, border: `2px dashed ${color}`, borderRadius: 14, padding: "10px 18px", fontFamily: "'DM Sans', sans-serif", textAlign: "center", minWidth: 200 }}>
      <Handle type="target" position={Position.Top}    style={{ background: color, width: 8, height: 8 }} />
      <Handle type="source" position={Position.Bottom} style={{ background: color, width: 8, height: 8 }} />
      <div style={{ fontWeight: 700, fontSize: "0.7rem", letterSpacing: "0.1em", textTransform: "uppercase", color: color }}>
        {data.icon as string} {data.label as string}
      </div>
      <div style={{ fontSize: "0.62rem", color: color, opacity: 0.7, marginTop: 2 }}>{data.sub as string}</div>
    </div>
  );
}

function BrandMgrNode({ data }: { data: Record<string, unknown> }) {
  const color = data.color as string;
  return (
    <div style={{ background: "#fff", border: `1px solid ${color}40`, borderLeft: `4px solid ${color}`, borderRadius: 10, padding: "8px 12px", minWidth: 150, maxWidth: 190, fontFamily: "'DM Sans', sans-serif", boxShadow: "0 1px 8px rgba(0,0,0,0.06)" }}>
      <Handle type="target" position={Position.Top} style={{ background: color, width: 7, height: 7 }} />
      <div style={{ fontWeight: 700, fontSize: "0.78rem", color: "#1a1a1a", marginBottom: 2 }}>{data.name as string}</div>
      <div style={{ fontSize: "0.64rem", color: color, fontWeight: 600 }}>{data.brands as string}</div>
    </div>
  );
}

function SeparatorNode({ data }: { data: Record<string, unknown> }) {
  const color = data.color as string;
  return (
    <div style={{ background: `${color}10`, border: `1.5px dashed ${color}60`, borderRadius: 12, padding: "6px 20px", fontFamily: "'DM Sans', sans-serif", fontSize: "0.62rem", color: color, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", whiteSpace: "nowrap" }}>
      {data.label as string}
    </div>
  );
}

const nodeTypes = { person: PersonNode, head: HeadNode, blockHeader: BlockHeaderNode, brandMgr: BrandMgrNode, separator: SeparatorNode };

const GOCASE_COLOR   = "#e8843a";
const GOBEAUTE_COLOR = "#7B5EA7";
const INFRA_COLOR    = "#2980b9";
const HEAD_COLOR     = "#7f8c8d";
const BI_COLOR       = "#27ae60";
const GROWTH_COLOR   = "#c0392b";

const initialNodes: Node[] = [
  { id: "eugene",    type: "head",   position: { x: 430, y: 0 },
    data: { name: "Eughenio Constantino", role: "Head de Tecnologia", dept: "Tech", color: HEAD_COLOR } },
  { id: "isaac",     type: "person", position: { x: -230, y: 220 },
    data: { name: "Isaac", role: "Product Manager", dept: "Gocase", color: GOCASE_COLOR } },
  { id: "daniel",    type: "person", position: { x: 0, y: 220 },
    data: { name: "Daniel Damasceno", role: "Tech Lead", dept: "Backoffice Gocase", color: GOCASE_COLOR } },
  { id: "isabella",  type: "person", position: { x: 225, y: 220 },
    data: { name: "Isabella Santos", role: "Desenvolvedora", dept: "Front Office Gocase", color: GOCASE_COLOR } },
  { id: "erik",      type: "person", position: { x: 455, y: 220 },
    data: { name: "Erik Rodrigues", role: "Especialista", dept: "Infra", color: INFRA_COLOR } },
  { id: "lucas",     type: "person", position: { x: 670, y: 220 },
    data: { name: "Lucas Braide", role: "Product Manager", dept: "Gobeaute", color: GOBEAUTE_COLOR, isMe: true } },
  { id: "wellington",type: "person", position: { x: 895, y: 220 },
    data: { name: "Wellington Brito", role: "Líder de E-commerce", dept: "Gobeaute", color: GOBEAUTE_COLOR } },
  { id: "sep-bi",    type: "separator", position: { x: -400, y: 100 },
    data: { label: "← Interface com Tech", color: BI_COLOR } },
  { id: "sep-growth",type: "separator", position: { x: 1150, y: 100 },
    data: { label: "Interface com Tech →", color: GROWTH_COLOR } },
  { id: "bi-header", type: "blockHeader", position: { x: -520, y: -10 },
    data: { icon: "📊", label: "Business Intelligence", sub: "Não reporta ao Eughenio", color: BI_COLOR } },
  { id: "bruno",     type: "person", position: { x: -520, y: 140 },
    data: { name: "Bruno", role: "Gestor", dept: "Supervisiona BI", color: "#555" } },
  { id: "gustavo",   type: "person", position: { x: -520, y: 330 },
    data: { name: "Gustavo", role: "Head de Dados", dept: "Business Intelligence", color: BI_COLOR } },
  { id: "growth-header", type: "blockHeader", position: { x: 1160, y: -10 },
    data: { icon: "📈", label: "Growth", sub: "Não reporta ao Eughenio", color: GROWTH_COLOR } },
  { id: "andre-castro",  type: "person", position: { x: 1160, y: 140 },
    data: { name: "André Castro", role: "Head de Growth", dept: "Growth", color: GROWTH_COLOR } },
  { id: "verstappen",    type: "person", position: { x: 1160, y: 330 },
    data: { name: "André 'Verstappen'", role: "Principal contato c/ Tech", dept: "Growth", color: GROWTH_COLOR } },
  { id: "bm-gabriel",   type: "brandMgr", position: { x: 1060, y: 510 },
    data: { name: "Gabriel Araújo", brands: "Lescent & Barbour's", color: GROWTH_COLOR } },
  { id: "bm-anthony",   type: "brandMgr", position: { x: 1270, y: 510 },
    data: { name: "Anthony", brands: "Rituária & By Samia", color: GROWTH_COLOR } },
  { id: "bm-matheus",   type: "brandMgr", position: { x: 1060, y: 640 },
    data: { name: "Matheus Almeida", brands: "Ápice & Auá", color: GROWTH_COLOR } },
  { id: "bm-caio",      type: "brandMgr", position: { x: 1270, y: 640 },
    data: { name: "Caio Joabe", brands: "Kokeshi", color: GROWTH_COLOR } },
];

const mkE = (id: string, s: string, t: string, color: string, dashed = false, label = ""): Edge => ({
  id, source: s, target: t, label, animated: !dashed,
  style: { stroke: color, strokeWidth: dashed ? 1.5 : 2, strokeDasharray: dashed ? "6 4" : undefined },
  markerEnd: { type: MarkerType.ArrowClosed, color },
  labelStyle: { fill: "#555", fontSize: 9, fontFamily: "DM Sans" },
  labelBgStyle: { fill: "#fff", borderRadius: 4 },
  type: "smoothstep",
});

const initialEdges: Edge[] = [
  mkE("e→isa-gc", "eugene", "isaac",    GOCASE_COLOR),
  mkE("e→dan", "eugene", "daniel",     GOCASE_COLOR),
  mkE("e→isa", "eugene", "isabella",   GOCASE_COLOR),
  mkE("e→eri", "eugene", "erik",       INFRA_COLOR),
  mkE("e→luc", "eugene", "lucas",      GOBEAUTE_COLOR),
  mkE("e→wel", "eugene", "wellington", GOBEAUTE_COLOR),
  mkE("bru→gus",    "bruno",       "gustavo",    BI_COLOR),
  mkE("bi→tech",    "gustavo",     "eugene",     BI_COLOR,     true, "Interface"),
  mkE("ac→ver",     "andre-castro","verstappen", GROWTH_COLOR),
  mkE("ver→bmg",    "verstappen",  "bm-gabriel", GROWTH_COLOR),
  mkE("ver→bma",    "verstappen",  "bm-anthony", GROWTH_COLOR),
  mkE("ver→bmm",    "verstappen",  "bm-matheus", GROWTH_COLOR),
  mkE("ver→bmc",    "verstappen",  "bm-caio",    GROWTH_COLOR),
  mkE("growth→tech","verstappen",  "wellington", GROWTH_COLOR, true, "Interface"),
];

const legendItems = [
  { color: HEAD_COLOR,     label: "Head de Tecnologia" },
  { color: GOCASE_COLOR,   label: "Time Gocase" },
  { color: GOBEAUTE_COLOR, label: "Time Gobeaute" },
  { color: INFRA_COLOR,    label: "Infra" },
  { color: BI_COLOR,       label: "BI / Dados (interface)" },
  { color: GROWTH_COLOR,   label: "Growth (interface)" },
];

export default function Equipe() {
  const { nodes, setNodes, onNodesChange, edges, onEdgesChange, onConnect, resetFlow, ready } =
    usePersistedFlow("equipe", initialNodes, initialEdges);

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
    <section id="equipe" style={{ background: "#f7f5f0", padding: "80px 0 0" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 40px 40px" }}>
        <div className="dots reveal" />
        <span className="pill reveal reveal-delay-1" style={{ marginBottom: 16, display: "inline-block" }}>EQUIPE</span>
        <h2 className="reveal reveal-delay-2" style={{ fontFamily: "'DM Serif Display', serif", fontWeight: 400, fontSize: "clamp(28px, 3.5vw, 48px)", color: "#1a1a1a", margin: "0 0 12px" }}>
          Organograma do Time de Tech
        </h2>
        <p className="reveal reveal-delay-3" style={{ fontSize: "1rem", color: "#666", marginBottom: 8, fontFamily: "'DM Sans', sans-serif" }}>
          Hierarquia interna + interfaces com BI e Growth. Times externos aparecem com linhas tracejadas.
        </p>
        <p style={{ color: "#999", fontSize: "0.8rem", marginBottom: 0, fontFamily: "'DM Sans', sans-serif" }}>
          Arraste · Zoom · Pan · Duplo clique para editar · Delete/Backspace para excluir selecionado
        </p>
      </div>

      <div style={{ height: 780, background: "#1a1a2e", position: "relative", opacity: ready ? 1 : 0, transition: "opacity 0.15s ease" }}>
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
          minZoom={0.2}
          maxZoom={2.5}
          deleteKeyCode={["Backspace", "Delete"]}
          defaultEdgeOptions={{ type: "smoothstep" }}
        >
          <Background color="#ffffff08" gap={28} variant={BackgroundVariant.Dots} />
          <Controls style={{ background: "#2659a5", borderRadius: 12, border: "2px solid #d7d900" }} />
          <MiniMap
            nodeColor={(n) => (n.data as Record<string, unknown>).color as string || "#888"}
            style={{ background: "#111", border: "2px solid #d7d900", borderRadius: 12 }}
          />
        </ReactFlow>

        {/* Legend */}
        <div style={{ position: "absolute", top: 16, left: 16, background: "rgba(0,0,0,0.78)", borderRadius: 12, padding: "12px 16px", fontSize: "0.68rem", color: "#fff", backdropFilter: "blur(8px)", zIndex: 10 }}>
          <div style={{ fontWeight: 700, marginBottom: 8, color: "#d7d900", letterSpacing: "0.06em", textTransform: "uppercase" }}>Legenda</div>
          {legendItems.map(l => (
            <div key={l.label} style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 5 }}>
              <div style={{ width: 10, height: 10, borderRadius: 3, background: l.color }} />
              {l.label}
            </div>
          ))}
          <div style={{ marginTop: 8, paddingTop: 8, borderTop: "1px solid rgba(255,255,255,0.15)", fontSize: "0.62rem", color: "rgba(255,255,255,0.5)" }}>
            <span style={{ borderBottom: "2px dashed #888", paddingBottom: 1 }}>&nbsp;&nbsp;&nbsp;&nbsp;</span>&nbsp;Interface (não reporta)
          </div>
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
