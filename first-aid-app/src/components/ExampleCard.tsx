import { useState } from 'react'
import type { ExampleCardProps } from '../types'

export default function ExampleCard({ title, description, initialLikes = 0 }: ExampleCardProps) {
  const [likes, setLikes] = useState(initialLikes)
  const [learned, setLearned] = useState(false)

  return (
    <section className="example-card" style={{border: '1px solid #ddd', padding: 16, borderRadius: 8, marginBottom: 12}}>
      <h3 style={{margin: '0 0 8px 0'}}>{title}</h3>
      <p style={{margin: '0 0 12px 0'}}>{description}</p>

      <div style={{display: 'flex', gap: 8, alignItems: 'center'}}>
        <button onClick={() => setLikes(l => l + 1)}>Like ({likes})</button>
        <button onClick={() => setLearned(l => !l)}>{learned ? 'Mark as Unread' : 'Mark as Learned'}</button>
        <span style={{marginLeft: 'auto', fontStyle: 'italic'}}>{learned ? 'Status: Learned' : 'Status: New'}</span>
      </div>
    </section>
  )
}