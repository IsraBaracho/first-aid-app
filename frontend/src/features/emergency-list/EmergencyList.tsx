import { useEmergencies } from './useEmergencies';
import EmergencyCard from '@/features/emergency-card/EmergencyCard';
import './EmergencyList.css';

export default function EmergencyList() {
    const { emergencies, loading, error } = useEmergencies();

    if (loading) return <div className="emergency-list">Carregando...</div>;
    if (error) return <div className="emergency-list">Erro: {error}</div>;

    return (
        <div className="grid-cards">
        {emergencies.map((emergency) => (
            <EmergencyCard key={emergency.id} emergency={emergency} />
        ))}
        </div>
    );
}