import { Link } from 'react-router-dom'
import type { FC } from 'react'
import './exampleCard.css'

type EmergencyItem = {
  id: string
  slug?: string
  title: string
  description?: string
  tags?: string[]
}

const EmergencyCard: FC<{ item: EmergencyItem }> = ({ item }) => {
  const to = `/emergency/${item.id}`
  return (
    <Link to={to} className="card-wrapper">
      <div className="card-icon">
        <span>❤️</span>
      </div>

      <div className="card-content">
        <div className="card-tags">
          {(item.tags || []).slice(0,2).map((t) => (
            <span key={t} className="tag">{t}</span>
          ))}
        </div>

        <h2 className="card-title">{item.title}</h2>
        <p className="card-description">{item.description}</p>

        <button className="card-link">
          Saiba mais <span className="arrow">→</span>
        </button>
      </div>
    </Link>
  )
}

export default EmergencyCard
