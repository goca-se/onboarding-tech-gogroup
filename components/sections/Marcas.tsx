"use client";

import { useState } from "react";

const LOGO_TOKEN = "pk_CII7EsFARtObSn1pyZlNhg";

const gocase = {
  name: "Gocase",
  domain: "gocase.com.br",
  accent: "#E8403A",
  accentLight: "#fdecea",
  segment: "Acessórios Personalizados",
  tagline: "O maior e-commerce de acessórios personalizados do Brasil — do case ao mundo.",
  desc: "Maior e-commerce de acessórios personalizados do Brasil, com produção própria em Extrema (MG). Portfólio: cases para iPhone e Samsung, mochilas, garrafinhas, carteiras e nécessaires — todos customizáveis com nome, foto ou arte de ilustradores parceiros. +2,2M de fãs online e mais de 200 Gocasers.",
  tags: ["Personalização", "Cases & Tech", "#1 Brasil", "Love Brand", "D2C"],
  url: "https://gocase.com.br",
  initials: "G",
};

const gobeauteMarcas = [
  {
    name: "Ápice",
    domain: "apicecosmeticos.com.br",
    accent: "#4A7C59",
    accentLight: "#eaf4ee",
    segment: "Capilar Low/No Poo",
    tagline: "Cabelos crespos e cacheados. Resultado real, sem abrir mão da saúde capilar.",
    desc: "Anteriormente Apse, a Ápice é especialista em rotinas capilares para cabelos crespos e cacheados com método low/no poo. Portfólio completo com linhas Onduladas Nutri Waves, Cachos, Crespo Power, África Baobá, Scalp Care, Ph Control e Minis. Conta com quiz de rotina capilar proprietário.",
    tags: ["Low/No Poo", "Cabelos Crespos", "Cachos", "Scalp Care", "Quiz de Rotina"],
    url: "https://apicecosmeticos.com.br",
    initials: "Á",
  },
  {
    name: "Barbour's Beauty",
    domain: "thebarboursbeauty.com.br",
    accent: "#B81C2E",
    accentLight: "#fdeef0",
    segment: "Body Splash Counter-type",
    tagline: "O luxo de Delina e Baccarat Rouge — ao alcance de todos.",
    desc: "Body splash inspirados nos maiores perfumes de luxo do mundo (Delina, Baccarat Rouge, Libre). Catálogo com versões femininas, masculinas, shimmer, iluminador corporal Golden Glow e kit personalizável. Maior volume de sessões do grupo: 1,85M sessões/mês só na collection principal.",
    tags: ["Body Splash", "Counter-type", "Golden Glow", "Kit Personalizável", "#1 em Volume"],
    url: "https://thebarboursbeauty.com.br",
    initials: "B",
  },
  {
    name: "Rituária",
    domain: "rituaria.com.br",
    accent: "#C9A800",
    accentLight: "#fdf8e1",
    segment: "Bem-Estar Integrado",
    tagline: "Suplementação funcional + skincare de alta performance. Cuidado de dentro para fora.",
    desc: "Marca de bem-estar integrado com suplementação funcional (intestino, sono, foco, emagrecimento, saúde feminina) e skincare de alto desempenho — Golden Stick FPS, uniformizadora e sérum antioxidante. Referência interna de CRO e UX para as demais marcas do grupo.",
    tags: ["Suplementação", "Skincare", "Bem-Estar", "CRO Reference", "Saúde Feminina"],
    url: "https://rituaria.com.br",
    initials: "R",
  },
  {
    name: "Kokeshi",
    domain: "kokeshi.com.br",
    accent: "#C45E7A",
    accentLight: "#fdeef2",
    segment: "J-Beauty · Pele de Porcelana",
    tagline: "A filosofia japonesa do skincare: minimalismo, ritual e resultados suaves.",
    desc: "Skincare J-beauty com conceito \"pele de porcelana\". Ativo principal: arroz fermentado, clareador e antioxidante. Portfólio completo: limpeza, hidratantes, séruns, geleias, proteção solar, cuidado para olhos e lábios, mais body splash e esfoliantes corporais.",
    tags: ["J-Beauty", "Arroz Fermentado", "Pele de Porcelana", "Skincare Completo", "SPF"],
    url: "https://kokeshi.com.br",
    initials: "K",
  },
  {
    name: "Lescent",
    domain: "lescent.com.br",
    accent: "#7B5EA7",
    accentLight: "#f3eefa",
    segment: "Perfumaria Counter-type",
    tagline: "Chanel, Dior, Tom Ford — a partir de R$49. Luxo com preço justo.",
    desc: "Perfumaria brasileira contra-tipo com posicionamento de luxo acessível. Referências: Chanel, Dior, Tom Ford, Maison Margiela. Fragrâncias a partir de R$49 em versões 25ml e 100ml, feminino e masculino. Alta fixação como argumento central de venda.",
    tags: ["Counter-type", "Alta Fixação", "Luxo Acessível", "25ml e 100ml", "Feminino & Masculino"],
    url: "https://lescent.com.br",
    initials: "L",
  },
  {
    name: "Auá Natural",
    domain: "auanatural.com.br",
    accent: "#7A4F2D",
    accentLight: "#f5ece4",
    segment: "Clean Beauty Brasileiro",
    tagline: "Biodiversidade brasileira como ativo. Skincare limpo, eficaz e com propósito.",
    desc: "Skincare clean beauty com ativos naturais da biodiversidade brasileira. Portfólio organizado por rosto, corpo, aromaterapia e kits por tipo de pele. Formulações sem ingredientes agressivos, com apelo ambiental e rastreabilidade dos ativos.",
    tags: ["Clean Beauty", "Biodiversidade Brasileira", "Skincare Natural", "Aromaterapia", "Kits"],
    url: "https://auanatural.com.br",
    initials: "A",
  },
  {
    name: "By Samia",
    domain: "bysamia.com.br",
    accent: "#1a1a1a",
    accentLight: "#f0f0f0",
    segment: "Aromaterapia & Óleos Essenciais",
    tagline: "Aromaterapia como estilo de vida. Cada blend tem uma intenção.",
    desc: "Especialista em aromaterapia com óleos essenciais puros, vegetais e blends terapêuticos. Linhas por intenção: Zen, Relaxante, Energizante, Sensual, Bem-Estar, Mulher e Refrescante. Roll-ons para uso diário. Linha Spa Basics capilar. Posicionamento holístico e terapêutico.",
    tags: ["Óleos Essenciais", "Roll-ons", "Blends Terapêuticos", "Spa Basics Capilar", "Holístico"],
    url: "https://bysamia.com.br",
    initials: "BS",
  },
];

const jumpMarcas = [
  {
    name: "We Are Knitters",
    domain: "weareknitters.com",
    accent: "#D4507A",
    accentLight: "#fdedf3",
    segment: "Tricô & Crochê DIY",
    tagline: "Tricô moderno para a geração maker. Kits completos, comunidade global.",
    desc: "Marca espanhola de kits de tricô e crochê para o público moderno. Kits completos com lã 100% natural, agulhas de madeira e padrão digital — do básico ao avançado. Comunidade de +1 milhão de makers desde 2011 com tutoriais em vídeo e feed colaborativo. Destaque em Vogue, Elle e NYT.",
    tags: ["Tricô & Crochê", "Kits DIY", "Lã Natural", "Comunidade", "Mindful Crafting"],
    url: "https://weareknitters.com",
    initials: "WK",
  },
  {
    name: "Life of Colour",
    domain: "lifeofcolourproducts.com",
    accent: "#E8973A",
    accentLight: "#fdf3e7",
    segment: "Arte & Mindfulness",
    tagline: "Arte como ferramenta de autoexpressão, presença plena e reconexão.",
    desc: "Marca australiana de kits de arte experiencial com foco em criatividade e bem-estar. Portfólio: paint by numbers, aquarela, mosaico, mandalas e kits 3D. Proposta: arte como ferramenta de autoexpressão, presença plena e reconexão. Inspirada pela costa australiana, natureza e comunidade.",
    tags: ["Paint by Numbers", "Aquarela", "Mosaico", "Mindfulness", "Arte em Casa"],
    url: "https://lifeofcolourproducts.com",
    initials: "LC",
  },
  {
    name: "Pott'd",
    domain: "getpottd.com",
    accent: "#5B8FA8",
    accentLight: "#eaf3f7",
    segment: "Cerâmica em Casa",
    tagline: "Cerâmica air-dry em casa. Sem studio, sem roda, sem forno.",
    desc: "Kit de cerâmica com argila air-dry para adultos iniciantes — sem studio, sem roda, sem forno. Inclui argila eco-friendly (seca em 24–48h), ferramentas de madeira, tintas acrílicas, verniz e guia passo a passo. Posicionado para date night, presente criativo e desconexão digital via artesanato sensorial.",
    tags: ["Air-dry Clay", "Cerâmica DIY", "Sem Studio", "Date Night", "Mental Health"],
    url: "https://getpottd.com",
    initials: "P",
  },
];

/* ── Reusable logo component ── */
function LogoImg({ domain, initials, accent }: { domain: string; initials: string; accent: string }) {
  const [failed, setFailed] = useState(false);
  const src = `https://img.logo.dev/${domain}?token=${LOGO_TOKEN}&size=128&format=png`;

  if (failed) {
    return (
      <div style={{
        width: 52, height: 52, borderRadius: 12, background: accent,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontFamily: "'DM Sans', sans-serif", fontWeight: 700, color: "#fff",
        fontSize: initials.length > 1 ? "0.85rem" : "1.25rem",
        letterSpacing: "-0.02em", flexShrink: 0,
      }}>
        {initials}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt=""
      width={52}
      height={52}
      onError={() => setFailed(true)}
      style={{ width: 52, height: 52, borderRadius: 12, objectFit: "contain", background: "#fff", flexShrink: 0, border: "1px solid #eee" }}
    />
  );
}

/* ── Section divider ── */
function SectionDivider({ label }: { label: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 16, margin: "52px 0 40px" }}>
      <div style={{ flex: 1, height: 1, background: "#e4e0d8" }} />
      <span style={{
        fontFamily: "'DM Sans', sans-serif",
        fontSize: "11px",
        color: "#aaa",
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        whiteSpace: "nowrap",
      }}>
        {label}
      </span>
      <div style={{ flex: 1, height: 1, background: "#e4e0d8" }} />
    </div>
  );
}

/* ── Brand card ── */
function BrandCard({
  m,
  delayClass,
  featured = false,
}: {
  m: typeof gocase;
  delayClass: string;
  featured?: boolean;
}) {
  return (
    <a
      href={m.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`reveal ${delayClass}`}
      style={{
        textDecoration: "none",
        display: "block",
        background: "#fff",
        borderRadius: 20,
        overflow: "hidden",
        boxShadow: featured
          ? `0 4px 24px ${m.accent}18, 0 2px 8px rgba(0,0,0,0.06)`
          : "0 2px 16px rgba(0,0,0,0.08)",
        border: featured ? `1.5px solid ${m.accent}25` : "none",
        borderTop: `${featured ? 6 : 5}px solid ${m.accent}`,
        transition: "transform 0.22s ease, box-shadow 0.22s ease",
        cursor: "pointer",
        gridColumn: featured ? "1 / -1" : undefined,
      } as React.CSSProperties}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.transform = "translateY(-5px)";
        (e.currentTarget as HTMLElement).style.boxShadow = `0 16px 40px ${m.accent}28`;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
        (e.currentTarget as HTMLElement).style.boxShadow = "0 2px 16px rgba(0,0,0,0.08)";
      }}
    >
      <div style={{ padding: "24px 28px 28px" }}>
        <div style={{ display: "flex", alignItems: "flex-start", gap: 16, marginBottom: 16 }}>
          <LogoImg domain={m.domain} initials={m.initials} accent={m.accent} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
              <h3 style={{
                fontFamily: "'DM Serif Display', serif",
                fontWeight: 400,
                fontSize: "1.3rem",
                color: "#1a1a1a",
                margin: 0,
                lineHeight: 1.2,
              }}>
                {m.name}
              </h3>
              <span style={{ color: "#bbb", fontSize: "0.8rem", flexShrink: 0 }}>↗</span>
            </div>
            <span style={{
              display: "inline-block",
              marginTop: 5,
              fontSize: "0.65rem",
              fontWeight: 600,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: m.accent,
              background: m.accentLight,
              padding: "3px 10px",
              borderRadius: 999,
            }}>
              {m.segment}
            </span>
          </div>
        </div>

        <p style={{
          fontFamily: "'DM Serif Display', serif",
          fontStyle: "italic",
          fontSize: "0.95rem",
          color: "#333",
          margin: "0 0 10px",
          lineHeight: 1.5,
        }}>
          &ldquo;{m.tagline}&rdquo;
        </p>

        <p style={{
          fontSize: "0.82rem",
          color: "#666",
          margin: "0 0 16px",
          lineHeight: 1.7,
          fontFamily: "'DM Sans', sans-serif",
        }}>
          {m.desc}
        </p>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {m.tags.map(tag => (
            <span
              key={tag}
              style={{
                fontSize: "0.68rem",
                fontWeight: 500,
                color: m.accent,
                background: m.accentLight,
                border: `1px solid ${m.accent}30`,
                borderRadius: 999,
                padding: "3px 10px",
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </a>
  );
}

export default function Marcas() {
  return (
    <section id="marcas" style={{ background: "#f7f5f0", padding: "100px 40px", fontFamily: "'DM Sans', sans-serif" }}>
      <div style={{ maxWidth: 1140, margin: "0 auto" }}>

        {/* Header */}
        <div className="dots reveal" />
        <span className="pill reveal reveal-delay-1" style={{ marginBottom: 20, display: "inline-block" }}>
          PORTFOLIO GOGROUP
        </span>

        <h2
          className="reveal reveal-delay-2"
          style={{
            fontFamily: "'DM Serif Display', serif",
            fontWeight: 400,
            fontSize: "clamp(32px, 4vw, 54px)",
            color: "#1a1a1a",
            margin: "0 0 12px",
            lineHeight: 1.1,
          }}
        >
          As Marcas que Você<br />
          <em style={{ color: "#2659a5" }}>vai Construir</em>
        </h2>

        <p
          className="reveal reveal-delay-3"
          style={{ color: "#777", fontSize: "1rem", marginBottom: 52, maxWidth: 520, lineHeight: 1.7, fontFamily: "'DM Sans', sans-serif" }}
        >
          10 marcas em 3 universos — do beauty DTC ao artesanato criativo, passando pelo maior e-commerce de acessórios personalizados do Brasil.
        </p>

        {/* ── Gocase featured card ── */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(480px, 1fr))", gap: 24 }}>
          <BrandCard m={gocase} delayClass="reveal-delay-1" featured />
        </div>

        {/* ── Gobeaute divider ── */}
        <SectionDivider label="Gobeaute · Beleza & Bem-Estar" />

        {/* ── Gobeaute grid ── */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(480px, 1fr))", gap: 24 }}>
          {gobeauteMarcas.map((m, i) => (
            <BrandCard key={m.domain} m={m} delayClass={`reveal-delay-${(i % 3) + 1}`} />
          ))}
        </div>

        {/* ── Jump divider ── */}
        <SectionDivider label="Jump · Crafts & Criatividade" />

        {/* ── Jump grid 2 colunas ── */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 24 }}>
          {jumpMarcas.map((m, i) => (
            <BrandCard key={m.domain} m={m} delayClass={`reveal-delay-${(i % 3) + 1}`} />
          ))}
        </div>

      </div>
    </section>
  );
}
