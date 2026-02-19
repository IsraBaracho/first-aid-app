import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { emergenciesApi } from "@/shared/api/emergencies";
import type { CreateEmergencyDTO, Step } from "@/shared/types/emergency";

export function useEmergencyForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    tags: "",
    description: "",
    cta: "",
    stepsText: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const parseSteps = (text: string): Step[] => {
    return text
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line, index) => {
        const [title, ...descParts] = line.split(":");
        return {
          title: title?.trim() || `Passo ${index + 1}`,
          description: descParts.join(":").trim() || "",
          order: index,
        };
      });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!formData.title || !formData.stepsText) {
      setError("Título e passos são obrigatórios");
      return;
    }

    const payload: CreateEmergencyDTO = {
      title: formData.title,
      steps: parseSteps(formData.stepsText),
      ...(formData.slug && { slug: formData.slug }),
      tags: formData.tags
        ? formData.tags
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean)
        : [],
      description: formData.description,
      cta: formData.cta || null,
    };

    try {
      setLoading(true);
      const created = await emergenciesApi.create(payload);
      navigate(`/emergency/${created.id}`);
    } catch (err) {
      setError(String(err));
    } finally {
      setLoading(false);
    }
  };

  return {
    formData,
    loading,
    error,
    handleChange,
    handleSubmit,
  };
}
