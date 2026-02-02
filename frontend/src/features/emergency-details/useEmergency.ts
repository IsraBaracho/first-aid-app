import { useFetch } from '@/shared/hooks/useFetch';
import { emergenciesApi } from '@/shared/api/emergencies';
import type { Emergency } from '@/shared/types/emergency';

export function useEmergency(id: string | undefined) {
    const { data, loading, error } = useFetch<Emergency | null>(async () => {
        if (!id) return null;
        return emergenciesApi.getById(id);
    });

    return {
        emergency: data,
        loading,
        error,
    };
}