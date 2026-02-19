//icons
import Phone from "@/assets/icons/local_map.svg";
//css
import "./find_hospital.css";
export default function CallSamu() {
  return (
    <a className="find-hospital-btn">
      <div className="text-group">
        <span className="title">ENCONTRAR UM HOSPITAL</span>
        <span className="subtitle">LOCALIZAÇÃO MAIS PRÓXIMA</span>
      </div>

      <img
        src={Phone}
        alt="Ícone de Ponteiro de Local no Mapa"
        className="icon"
      />
    </a>
  );
}
