import "./heroBanner.css"

export default function HeroBanner() {
  return (
    <section className="hero-banner">
      <div className="hero-overlay">
        <div className="container hero-content">
          <h1>Qual emergência você está procurando?</h1>
          {/* Aqui entra a barra de busca depois */}
        </div>
      </div>
    </section>
  )
}
