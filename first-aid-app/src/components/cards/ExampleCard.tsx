import "./exampleCard.css"

interface ExampleCardProps {
  title: string
  description: string
  tags?: string[]
}

export default function ExampleCard({
  title,
  description,
  tags = []
}: ExampleCardProps) {
  return (
    <div className="card-wrapper">
      <div className="card-icon">
        <span>❤️</span>
      </div>

      <div className="card-content">
        <div className="card-tags">
          {tags.map((tag) => (
            <span key={tag} className="tag">
              {tag}
            </span>
          ))}
        </div>

        <h2 className="card-title">{title}</h2>
        <p className="card-description">{description}</p>

        <button className="card-link">
          Saiba mais <span className="arrow">→</span>
        </button>
      </div>
    </div>
  )
}
