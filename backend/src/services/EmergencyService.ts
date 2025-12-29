import { EmergencyRepository } from '../repositories/EmergencyRepository';
import { Emergency, EmergencyDTO, UpdateEmergencyDTO } from '../models/Emergency';

export class EmergencyService {
    private repository: EmergencyRepository;

    constructor() {
        this.repository = new EmergencyRepository();
    }

    // Aux method: generate slug from title
    private generateSlug(title: string): string {
        return title
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
            .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric with hyphens
            .replace(/^-+|-+$/g, ''); // Trim hyphens from start and end
    }

    // Aux method: generate unique ID
    private generateId(slug: string): string {
        return `${slug}-${Date.now()}`;
    }

    // Seach all emergencies
    async getAllEmergencies(): Promise<Emergency[]> {
        return this.repository.findAll();
    }

    // Search emergency by ID or slug
    async getEmergencyById(id: string): Promise<Emergency | null> {
        return this.repository.findById(id);
    }

    // Create new emergency
    async createEmergency(data: EmergencyDTO): Promise<Emergency> {  
        
        if(!data.title || !data.steps || data.steps.length === 0){
            throw new Error('Title and steps are required to create an emergency.');
        }

        const slug = data.slug || this.generateSlug(data.title);

        const id = this.generateId(slug);

        const newEmergency: Emergency = {
            id,
            slug,
            title: data.title,
            tags: data.tags || [],
            description: data.description || '',
            cta: data.cta || null,
            steps: data.steps
        };

        return this.repository.create(newEmergency)
    }

    // Update existing emergency
    async updateEmergency(id: string, data: UpdateEmergencyDTO): Promise<Emergency | null> {

        const exists = await this.repository.findById(id);
        if(!exists){
            throw new Error('Emergency not found.');
            return null;
        }
        const updateData = { ...data };
        if(data.title && data.title !== exists.title){
            updateData.slug = this.generateSlug(data.title);
        }

        return this.repository.update(id, updateData);
    }

    // Delete emergency
    async deleteEmergency(id: string): Promise<Emergency | null> {
        return this.repository.delete(id);
    }
}