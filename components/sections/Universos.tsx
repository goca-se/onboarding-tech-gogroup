const gobeauteMarcas = [
  { name: "Ápice",      color: "#1e4d31", textColor: "#fff", seg: "Skincare premium" },
  { name: "Barbour's",  color: "#C41E3A", textColor: "#fff", seg: "Barbear masculino" },
  { name: "Lescent",    color: "#7B4F8C", textColor: "#fff", seg: "Perfumaria nicho" },
  { name: "Rituária",   color: "#c9a800", textColor: "#1a1a1a", seg: "Skincare ritual" },
  { name: "Kokeshi",    color: "#FF2D9E", textColor: "#fff", seg: "Beleza japonesa" },
  { name: "By Samia",   color: "#1a1a1a", textColor: "#fff", seg: "Beleza natural" },
  { name: "Auá",        color: "#C17B2E", textColor: "#fff", seg: "Beleza afro-bras." },
];

const jumpMarcas = [
  { name: "Life of Colour",  flag: "🇦🇺", country: "Australia", color: "#FF9F43" },
  { name: "Pott'd",          flag: "🇬🇧", country: "UK",        color: "#5CAD82" },
  { name: "We Are Knitters", flag: "🇪🇸", country: "Espanha",   color: "#E74C6C" },
];

function BrowserCard({ children, dots }: { children: React.ReactNode; dots: string }) {
  return (
    <div className="browser-card card-hover" style={{ height: "100%" }}>
      <div className="browser-bar">
        <div className="browser-dot" style={{ background: "#e5381a" }} />
        <div className="browser-dot" style={{ background: "#f8ae13" }} />
        <div className="browser-dot" style={{ background: "#4a7c59" }} />
        <span style={{ marginLeft: 8, fontSize: "0.65rem", color: "#999", fontWeight: 600, letterSpacing: "0.04em" }}>
          {dots}
        </span>
      </div>
      <div style={{ padding: "28px 28px 32px" }}>{children}</div>
    </div>
  );
}

export default function Universos() {
  return (
    <section id="universos" style={{ background: "#2659a5", padding: "clamp(48px,8vw,100px) clamp(20px,5vw,40px)" }}>
      <div style={{ maxWidth: 1300, margin: "0 auto" }}>
        {/* Header */}
        <div className="dots reveal" />
        <span className="pill reveal reveal-delay-1" style={{ marginBottom: 16, display: "inline-block" }}>ECOSSISTEMA</span>
        <h2 className="reveal reveal-delay-2" style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 800, fontSize: "clamp(32px, 4vw, 56px)", color: "#d7d900", margin: "0 0 16px" }}>
          Nossos Universos
        </h2>
        <p className="reveal reveal-delay-3" style={{ color: "rgba(255,255,255,0.7)", fontSize: "1rem", marginBottom: 52, maxWidth: 600 }}>
          Três frentes que compõem o portfólio do grupo. Tech Gobeaute e Tech Gocase são times distintos, cada um com seu próprio domínio.
        </p>

        {/* ── Dois squads de Tech ── */}
        <div className="reveal reveal-delay-2" style={{ marginBottom: 40 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
            <div style={{ flex: 1, height: 1, background: "rgba(215,217,0,0.3)" }} />
            <span style={{ color: "#d7d900", fontWeight: 700, fontSize: "0.72rem", letterSpacing: "0.12em", textTransform: "uppercase", whiteSpace: "nowrap" }}>
              DOIS SQUADS INDEPENDENTES DE TECNOLOGIA
            </span>
            <div style={{ flex: 1, height: 1, background: "rgba(215,217,0,0.3)" }} />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(260px,100%), 1fr))", gap: 16 }}>
            {/* Squad Gobeaute */}
            <div style={{ background: "rgba(230,23,130,0.22)", border: "2px solid rgba(230,23,130,0.7)", borderRadius: 20, padding: "20px 24px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                <span style={{ fontSize: "1.2rem" }}>💄</span>
                <span style={{ fontWeight: 800, color: "#ff6eb3", fontSize: "1rem" }}>Tech Gobeaute</span>
                <span className="pill" style={{ background: "rgba(230,23,130,0.35)", color: "#ffadd6", fontSize: "0.55rem", padding: "3px 8px" }}>7 MARCAS DTC</span>
              </div>
              <p style={{ color: "rgba(255,255,255,0.85)", fontSize: "0.8rem", margin: 0, lineHeight: 1.6 }}>
                Stack de e-commerce DTC: Shopify, Yampi, Middleware v2, CRM, Analytics, Media.
                7 marcas de beleza no portfólio ativo.
              </p>
            </div>

            {/* Squad Gocase */}
            <div style={{ background: "rgba(232,64,58,0.22)", border: "2px solid rgba(232,64,58,0.7)", borderRadius: 20, padding: "20px 24px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                <span style={{ fontSize: "1.2rem" }}>🎒</span>
                <span style={{ fontWeight: 800, color: "#ff7b75", fontSize: "1rem" }}>Tech Gocase</span>
                <span className="pill" style={{ background: "rgba(232,64,58,0.35)", color: "#ff9490", fontSize: "0.55rem", padding: "3px 8px" }}>#1 BR PERSONALIZADOS</span>
              </div>
              <p style={{ color: "rgba(255,255,255,0.85)", fontSize: "0.8rem", margin: 0, lineHeight: 1.6 }}>
                Stack própria de acessórios personalizados: site interno, motor de customização
                e produção em Extrema/MG — maior e-commerce do segmento no Brasil.
              </p>
            </div>
          </div>
        </div>

        {/* Cards grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(280px,100%), 1fr))", gap: 24, alignItems: "start" }}>

          {/* ─── GOCASE ─── */}
          <div className="reveal reveal-delay-1">
            <BrowserCard dots="gocase.com.br">
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
                <span className="pill pill-blue" style={{ fontSize: "0.65rem" }}>GOCASE</span>
                <span style={{ fontSize: "0.65rem", color: "#888", fontWeight: 600 }}>2015 · Fortaleza, CE</span>
              </div>
              <h3 style={{ fontWeight: 800, fontSize: "1.4rem", color: "#2659a5", margin: "0 0 10px" }}>Gocase</h3>
              <p style={{ fontSize: "0.88rem", color: "#555", lineHeight: 1.65, margin: "0 0 16px" }}>
                Marca de acessórios personalizados — cases, mochilas e periféricos. Primeira marca do grupo.
              </p>

              {/* Gocase Tech details */}
              <div style={{ background: "#f5f0e8", borderRadius: 14, padding: "16px 18px", marginBottom: 14, borderLeft: "4px solid #2659a5" }}>
                <div style={{ fontWeight: 700, fontSize: "0.72rem", color: "#2659a5", marginBottom: 8, letterSpacing: "0.06em", textTransform: "uppercase" }}>
                  Time de Tech Gocase — Stack própria
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                  {[
                    { icon: "🏭", text: "Operação em Extrema/MG (CD + personalização)" },
                    { icon: "🌐", text: "Site desenvolvido internamente" },
                    { icon: "⚙️", text: "Sistemas de personalização sob medida" },
                    { icon: "📦", text: "ERP e fulfillment apartados do grupo" },
                  ].map((i) => (
                    <div key={i.text} style={{ display: "flex", gap: 6, fontSize: "0.75rem", color: "#555" }}>
                      <span>{i.icon}</span><span>{i.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ background: "#f5f0e8", borderRadius: 14, padding: "14px 18px", borderLeft: "4px solid #d7d900" }}>
                <div style={{ fontWeight: 700, fontSize: "0.8rem", color: "#1a1a1a" }}>AZ by Gocase</div>
                <div style={{ fontSize: "0.75rem", color: "#777", marginTop: 2 }}>Linha de acessórios premium</div>
              </div>
            </BrowserCard>
          </div>

          {/* ─── GOBEAUTE ─── */}
          <div className="reveal reveal-delay-2">
            <BrowserCard dots="gobeaute.com.br">
              <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 8, marginBottom: 20 }}>
                <span className="pill" style={{ background: "#e61782", color: "#fff", fontSize: "0.6rem" }}>GOBEAUTE</span>
                <span className="pill" style={{ background: "#f5eaf2", color: "#e61782", fontSize: "0.6rem" }}>BEAUTY DTC</span>
              </div>
              <h3 style={{ fontWeight: 800, fontSize: "1.4rem", color: "#e61782", margin: "0 0 10px" }}>Gobeaute</h3>
              <p style={{ fontSize: "0.88rem", color: "#555", lineHeight: 1.65, margin: "0 0 20px" }}>
                Hub de marcas de beleza <strong>DTC (Direct-to-Consumer)</strong>. O time de Tech Gobeaute
                cuida de toda a operação digital das 7 marcas do portfólio.
              </p>
              <div style={{ fontSize: "0.72rem", fontWeight: 700, color: "#888", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 12 }}>
                Marcas do portfólio
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {gobeauteMarcas.map((m) => (
                  <div key={m.name} title={m.seg} style={{ background: m.color, color: m.textColor, borderRadius: 8, padding: "5px 12px", fontSize: "0.72rem", fontWeight: 700 }}>
                    {m.name}
                  </div>
                ))}
              </div>
            </BrowserCard>
          </div>

          {/* ─── JUMP VENTURES ─── */}
          <div className="reveal reveal-delay-3">
            <div className="card-hover" style={{ background: "rgba(255,255,255,0.06)", border: "2px dashed rgba(215,217,0,0.45)", borderRadius: 24, overflow: "hidden" }}>
              <div style={{ background: "rgba(248,174,19,0.12)", padding: "10px 16px", display: "flex", alignItems: "center", gap: 6, borderBottom: "1px solid rgba(215,217,0,0.2)" }}>
                {[1,2,3].map(n => <div key={n} style={{ width: 10, height: 10, borderRadius: "50%", background: "rgba(255,255,255,0.2)" }} />)}
                <span style={{ marginLeft: 8, fontSize: "0.65rem", color: "rgba(215,217,0,0.7)", fontWeight: 600, letterSpacing: "0.04em" }}>jumpventures.io</span>
              </div>
              <div style={{ padding: "28px 28px 32px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
                  <span className="pill" style={{ background: "#f8ae13", color: "#1a1a1a", fontSize: "0.6rem" }}>JUMP VENTURES</span>
                  <span style={{ fontSize: "0.65rem", color: "rgba(255,255,255,0.5)", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}>UNIVERSO INDEPENDENTE</span>
                </div>
                <h3 style={{ fontWeight: 800, fontSize: "1.4rem", color: "#f8ae13", margin: "0 0 10px" }}>Jump Ventures</h3>
                <p style={{ fontSize: "0.88rem", color: "rgba(255,255,255,0.7)", lineHeight: 1.65, margin: "0 0 24px" }}>
                  Portfólio de marcas internacionais com operação autônoma em relação ao Tech do grupo.
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {jumpMarcas.map((m) => (
                    <div key={m.name} style={{ background: "rgba(255,255,255,0.07)", border: `1px solid ${m.color}40`, borderLeft: `4px solid ${m.color}`, borderRadius: 12, padding: "12px 16px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <div>
                        <div style={{ fontWeight: 700, color: "#fff", fontSize: "0.9rem" }}>{m.name}</div>
                        <div style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.5)" }}>{m.country}</div>
                      </div>
                      <span style={{ fontSize: "1.4rem" }}>{m.flag}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
