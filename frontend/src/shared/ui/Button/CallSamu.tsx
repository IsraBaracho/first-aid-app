//icons
import Phone from "@/assets/icons/phone.svg";
//css
import "./call_samu.css";
export default function CallSamu() {
  return (
    <a className="call-samu-btn">
      <div className="text-group">
        <span className="title">LIGAR PARA O SAMU</span>
        <span className="subtitle">SERVIÇOS DE EMERGÊNCIA</span>
      </div>

      <img src={Phone} alt="Ícone de telefone" className="icon" />
    </a>
  );
}
