import { useParams } from "react-router-dom";
import Layout from "@/shared/ui/Layout/Layout";
import { EmergencyDetails } from "@/features/emergency-details";
import BackHomeButton from "@/shared/ui/Button/backHome";
import "./EmergencyDetailsPage.css";

export default function EmergencyDetailsPage() {
  const { id } = useParams();

  return (
    <Layout>
      <div className="emergency-details-page">
        <BackHomeButton />
        <EmergencyDetails id={id} />
      </div>
    </Layout>
  );
}
