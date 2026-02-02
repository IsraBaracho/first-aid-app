import Layout from '@/shared/ui/Layout/Layout';
import { EmergencyForm } from '@/features/emergency-form';
import './CreateEmergencyPage.css';

export default function CreateEmergencyPage() {
    return (
        <Layout>
        <div className="create-emergency-page">
            <h1>Criar nova emergência</h1>
            <EmergencyForm />
        </div>
        </Layout>
    );
}