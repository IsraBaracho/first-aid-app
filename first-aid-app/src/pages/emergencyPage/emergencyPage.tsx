import Header from '../../components/header/Header'
import Footer from '../../components/Footer'
import BtnBackHome from '../../components/buttons/backHome/backHome'
import './emergencyPage.css'
import phoneIcon from '../../assets/icons/red-phone.svg'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

export default function EmergencyPage(){
  const { id } = useParams()
  const [item, setItem] = useState<any | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setLoading(true)
    fetch('/emergencies.json')
      .then(res => {
        if(!res.ok) throw new Error('Falha ao carregar emergências')
        return res.json()
      })
      .then((data:any[]) => {
        const found = data.find((e:any) => e.id === id || e.slug === id)
        setItem(found || null)
      })
      .catch(err => setError(String(err)))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) return <main className="emergency-page"><Header /><div className="page-container">Carregando...</div><Footer/></main>
  if (error) return <main className="emergency-page"><Header /><div className="page-container">Erro: {error}</div><Footer/></main>
  if (!item) return <main className="emergency-page"><Header /><div className="page-container"><p>Emergência não encontrada.</p></div><Footer/></main>

  return (
    <main className="emergency-page">
      <Header />

      <div className="page-container">
        <BtnBackHome />

        <section className="hero-card">
          <div className="hero-card-inner">
            <div className="hero-tags">
              {(item.tags || []).map((t:string) => <span key={t} className="tag">{t}</span>)}
            </div>

            <h1 className="hero-title">{item.title}</h1>
            <p className="hero-desc">{item.description}</p>

            <div className="hero-cta">
              <img src={phoneIcon} alt="telefone" className="cta-icon" />
              <div className="cta-text">
                <strong>{item.cta?.title}</strong>
                <div className="cta-sub">{item.cta?.subtitle}</div>
              </div>
            </div>
          </div>
        </section>

        <section className="steps-card">
          <div className="steps-header">
            <h2>Como Proceder</h2>
          </div>

          <ol className="steps-list">
            {item.steps?.map((s:string) => <li key={s}>{s}</li>)}
          </ol>
        </section>
      </div>

      <Footer />
    </main>
  )
}