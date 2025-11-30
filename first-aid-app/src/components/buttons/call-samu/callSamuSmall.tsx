
//icons
import Phone from "@/assets/icons/red-phone.svg";
//css
import "./call_samu.css";

export default function CallSamu() {
  return (
    <a className="call-samu-small-btn">
      <img src={Phone} alt="Ícone de telefone" className="icon" />
        <div className="text-group">
            <span className="title">192</span>
        </div>
    </a>
  )
}