"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";
import Navbar from "@/components/Navbar";
import Hero from "@/components/sections/Hero";
import Valores from "@/components/sections/Valores";
import Universos from "@/components/sections/Universos";
import Marcas from "@/components/sections/Marcas";
import Organograma from "@/components/sections/Organograma";
import Stack from "@/components/sections/Stack";
import Ferramentas from "@/components/sections/Ferramentas";
import Equipe from "@/components/sections/Equipe";
import Footer from "@/components/Footer";

export default function Home() {
  useScrollReveal();

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Valores />
        <Universos />
        <Marcas />
        <Organograma />
        <Stack />
        <Ferramentas />
        <Equipe />
      </main>
      <Footer />
    </>
  );
}
