"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { useNodesState, useEdgesState, addEdge } from "@xyflow/react";
import type { Node, Edge, Connection } from "@xyflow/react";

export function usePersistedFlow(
  key: string,
  defaultNodes: Node[],
  defaultEdges: Edge[]
) {
  const [nodes, setNodes, onNodesChange] = useNodesState(defaultNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(defaultEdges);
  const [ready, setReady] = useState(false);
  const defaultNodesRef = useRef(defaultNodes);
  const defaultEdgesRef = useRef(defaultEdges);

  // Load from localStorage after client mount (avoids hydration mismatch)
  useEffect(() => {
    try {
      const sn = localStorage.getItem(`flow:${key}:nodes`);
      const se = localStorage.getItem(`flow:${key}:edges`);
      if (sn) setNodes(JSON.parse(sn));
      if (se) setEdges(JSON.parse(se));
    } catch { /* empty */ }
    setReady(true);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!ready) return;
    localStorage.setItem(`flow:${key}:nodes`, JSON.stringify(nodes));
  }, [nodes, key, ready]);

  useEffect(() => {
    if (!ready) return;
    localStorage.setItem(`flow:${key}:edges`, JSON.stringify(edges));
  }, [edges, key, ready]);

  const onConnect = useCallback(
    (params: Connection) =>
      setEdges((eds) => addEdge({ ...params, type: "smoothstep", animated: true }, eds)),
    [setEdges]
  );

  const resetFlow = useCallback(() => {
    localStorage.removeItem(`flow:${key}:nodes`);
    localStorage.removeItem(`flow:${key}:edges`);
    setNodes(defaultNodesRef.current);
    setEdges(defaultEdgesRef.current);
  }, [key, setNodes, setEdges]);

  return { nodes, setNodes, onNodesChange, edges, setEdges, onEdgesChange, onConnect, resetFlow, ready };
}
