import { Link } from "react-router-dom";
import type { Emergency } from "@/shared/types/emergency";
import "./EmergencyCard.css";

interface EmergencyCardProps {
  emergency: Emergency;
}

export default function EmergencyCard({ emergency }: EmergencyCardProps) {
  return (
    <Link to={`/emergency/${emergency.id}`} className="card-wrapper">
      <div className="card-icon">
        <span>⚕</span>
      </div>
      <div className="card-content">
        <div className="card-tags">
          {emergency.tags.slice(0, 2).map((tag) => (
            <span key={tag} className="tag">
              {tag}
            </span>
          ))}
        </div>
        <h2 className="card-title">{emergency.title}</h2>
        <p className="card-description">{emergency.description}</p>
        <button className="card-link">
          Saiba mais <span className="arrow">→</span>
        </button>
      </div>
    </Link>
  );
}
