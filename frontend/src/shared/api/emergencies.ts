import { api } from './client';
import type { Emergency, CreateEmergencyDTO, UpdateEmergencyDTO } from '../types/emergency';

export const emergenciesApi = {
    getAll: () => api.get<Emergency[]>('/emergencies'),

    getById: (id: string) => api.get<Emergency>(`/emergencies/${id}`),

    create: (data: CreateEmergencyDTO) => api.post<Emergency>('/emergencies', data),

    update: (id: string, data: UpdateEmergencyDTO) => api.put<Emergency>(`/emergencies/${id}`, data),

    delete: (id: string) => api.delete<{ message: string; deleted: Emergency }>(`/emergencies/${id}`),
};