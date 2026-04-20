"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

export type Brand = "gobeaute" | "gocase";

interface BrandCtx {
  brand: Brand;
  setBrand: (b: Brand) => void;
}

const BrandContext = createContext<BrandCtx>({ brand: "gobeaute", setBrand: () => {} });

export function BrandProvider({ children }: { children: ReactNode }) {
  const [brand, setBrand] = useState<Brand>("gobeaute");
  return <BrandContext.Provider value={{ brand, setBrand }}>{children}</BrandContext.Provider>;
}

export function useBrand() {
  return useContext(BrandContext);
}
