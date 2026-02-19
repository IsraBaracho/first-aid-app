import Layout from "@/shared/ui/Layout/Layout";
import HeroBanner from "@/shared/ui/Banner/heroBanner";
import { EmergencyList } from "@/features/emergency-list";
import "./HomePage.css";

export default function HomePage() {
  return (
    <Layout>
      <HeroBanner />
      <div className="home-container">
        <h2 className="home-title">EMERGÊNCIAS COMUNS NO BRASIL</h2>
        <EmergencyList />
      </div>
    </Layout>
  );
}
