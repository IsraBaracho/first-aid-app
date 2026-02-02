import { useEmergencyForm } from './useEmergencyForm';
import './EmergencyForm.css';

export default function EmergencyForm() {
    const { formData, loading, error, handleChange, handleSubmit } = useEmergencyForm();

    return (
        <form className="emergency-form" onSubmit={handleSubmit}>
        <label>
            Título
            <input name="title" value={formData.title} onChange={handleChange} />
        </label>

        <label>
            Slug (opcional)
            <input name="slug" value={formData.slug} onChange={handleChange} />
        </label>

        <label>
            Tags (vírgula separadas)
            <input name="tags" value={formData.tags} onChange={handleChange} />
        </label>

        <label>
            Descrição
            <textarea name="description" value={formData.description} onChange={handleChange} />
        </label>

        <label>
            CTA (aviso importante)
            <input name="cta" value={formData.cta} onChange={handleChange} />
        </label>

        <label>
            Passos (formato: Título: Descrição)
            <textarea
            name="stepsText"
            rows={6}
            value={formData.stepsText}
            onChange={handleChange}
            placeholder={"Resfrie a área: Use água fria por 10 minutos\nCubra: Use pano limpo"}
            />
        </label>

        {error && <div className="form-error">{error}</div>}

        <button type="submit" disabled={loading}>
            {loading ? 'Salvando...' : 'Criar emergência'}
        </button>
        </form>
    );
}