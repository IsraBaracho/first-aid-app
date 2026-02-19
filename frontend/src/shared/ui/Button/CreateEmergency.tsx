import { useNavigate } from "react-router-dom";
import "./create_emergency.css";

export default function CreateEmergencyBtn() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/admin/new");
  };

  return (
    <button onClick={handleClick} className="create-emergency-btn">
      <div className="text-group">
        <span className="title">CRIAR EMERGÊNCIA</span>
      </div>
    </button>
  );
}
