import { useEmergency } from './useEmergency';
import phoneIcon from '@/assets/icons/red-phone.svg';
import './EmergencyDetails.css';

interface EmergencyDetailsProps {
    id: string | undefined;
}

export default function EmergencyDetails({ id }: EmergencyDetailsProps) {
    const { emergency, loading, error } = useEmergency(id);

    if (loading) return <div className="emergency-details">Carregando...</div>;
    if (error) return <div className="emergency-details">Erro: {error}</div>;
    if (!emergency) return <div className="emergency-details">Emergência não encontrada.</div>;

    return (
        <div className="emergency-details">
        <section className="hero-card">
            <div className="hero-card-inner">
            <div className="hero-tags">
                {emergency.tags.map((tag) => (
                <span key={tag} className="tag">{tag}</span>
                ))}
            </div>
            <h1 className="hero-title">{emergency.title}</h1>
            <p className="hero-desc">{emergency.description}</p>

            {emergency.cta && (
                <div className="hero-cta">
                <img src={phoneIcon} alt="telefone" className="cta-icon" />
                <div className="cta-text">
                    <strong>{emergency.cta}</strong>
                </div>
                </div>
            )}
            </div>
        </section>

        <section className="steps-card">
            <div className="steps-header">
            <h2>Como Proceder</h2>
            </div>
            <ol className="steps-list">
            {emergency.steps.map((step, index) => (
                <li key={step.id || index}>
                <strong>{step.title}</strong>
                <p>{step.description}</p>
                </li>
            ))}
            </ol>
        </section>
        </div>
    );
}