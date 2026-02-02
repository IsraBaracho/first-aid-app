import CallSamu from '@/shared/ui/Button/CallSamu';
import FindHospital from '@/shared/ui/Button/FindHospital';
import './header.css';

export default function Header() {
  return (
    <header className="site-header container">
      <CallSamu />
      <FindHospital />
    </header>
  );
}