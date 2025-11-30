import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../../components/header/Header'
import Footer from '../../components/Footer'
import './createEmergency.css'

export default function CreateEmergency(){
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [slug, setSlug] = useState('')
  const [tags, setTags] = useState('')
  const [description, setDescription] = useState('')
  const [ctaTitle, setCtaTitle] = useState('')
  const [ctaSubtitle, setCtaSubtitle] = useState('')
  const [stepsText, setStepsText] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e:any){
    e.preventDefault()
    setError(null)
    if (!title || !stepsText) {
      setError('Título e passos são obrigatórios')
      return
    }
    const payload = {
      title,
      slug: slug || undefined,
      tags: tags ? tags.split(',').map(t => t.trim()).filter(Boolean) : [],
      description,
      cta: { title: ctaTitle, subtitle: ctaSubtitle },
      steps: stepsText.split('\n').map(s => s.trim()).filter(Boolean)
    }

    try {
      setLoading(true)
      const res = await fetch('/api/emergencies', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      if (!res.ok) throw new Error('Falha ao criar emergência')
      const data = await res.json()
      // redirect to new emergency page
      navigate(`/emergency/${data.id}`)
    } catch (err:any) {
      setError(String(err))
    } finally {
      setLoading(false)
    }
  }

  return (
    <main>
      <Header />
      <div className="page-container">
        <h1>Criar nova emergência</h1>
        <form className="create-form" onSubmit={handleSubmit}>
          <label>Título
            <input value={title} onChange={e => setTitle(e.target.value)} />
          </label>

          <label>Slug (opcional)
            <input value={slug} onChange={e => setSlug(e.target.value)} />
          </label>

          <label>Tags (vírgula separadas)
            <input value={tags} onChange={e => setTags(e.target.value)} />
          </label>

          <label>Descrição
            <textarea value={description} onChange={e => setDescription(e.target.value)} />
          </label>

          <label>CTA - Título
            <input value={ctaTitle} onChange={e => setCtaTitle(e.target.value)} />
          </label>

          <label>CTA - Subtítulo
            <input value={ctaSubtitle} onChange={e => setCtaSubtitle(e.target.value)} />
          </label>

          <label>Passos (uma linha por passo)
            <textarea rows={6} value={stepsText} onChange={e => setStepsText(e.target.value)} />
          </label>

          {error && <div className="form-error">{error}</div>}

          <button type="submit" disabled={loading}>{loading ? 'Salvando...' : 'Criar emergência'}</button>
        </form>
      </div>
      <Footer />
    </main>
  )
}
