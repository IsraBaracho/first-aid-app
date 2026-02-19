import { useFetch } from "@/shared/hooks/useFetch";
import { emergenciesApi } from "@/shared/api/emergencies";
import type { Emergency } from "@/shared/types/emergency";

export function useEmergencies() {
  const { data, loading, error, refetch } = useFetch<Emergency[]>(
    emergenciesApi.getAll,
  );

  return {
    emergencies: data || [],
    loading,
    error,
    refetch,
  };
}
