import Samu_btn from "../buttons/call-samu/call_samu"
import FindHospital from "../buttons/find-hospital/find_hospital"
import "./header.css"

export default function Header() {
  return (
    <header className="site-header container">
      <Samu_btn />
      <FindHospital />
    </header>
  )
}