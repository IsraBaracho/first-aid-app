import "./backHome.css";
import { useNavigate } from "react-router-dom";

export default function BackHome() {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      aria-label="Voltar para a página inicial"
      onClick={() => navigate("/")}
      className="card-link"
    >
      <span className="arrow">←</span>Voltar
    </button>
  );
}
