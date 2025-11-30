import { useEffect, useState } from 'react'
import EmergencyCard from '../cards/EmergencyCard'
import './gridCards.css'

export default function GridCards(){
  const [items, setItems] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setLoading(true)
    fetch('/api/emergencies')
      .then((res) => {
        if(!res.ok) throw new Error('Falha ao carregar dados')
        return res.json()
      })
      .then((data) => setItems(data))
      .catch((err) => setError(String(err)))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <div className="grid-cards">Carregando...</div>
  if (error) return <div className="grid-cards">Erro: {error}</div>

  return (
    <div className="grid-cards">
      {items.map((item:any) => (
        <EmergencyCard key={item.id} item={item} />
      ))}
    </div>
  )
}
