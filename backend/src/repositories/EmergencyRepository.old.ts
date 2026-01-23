import fs from 'fs/promises';
import path from 'path';
import { Emergency } from '../models/Emergency';

export class EmergencyRepository {
    private filePath: string;

    constructor(){
        this.filePath = path.join(__dirname, '../../data/emergencies.json');
    }

    private async readFile(): Promise<Emergency[]>{
        try {
            const data = await fs.readFile(this.filePath, 'utf-8');
            if(!data || data.trim() === ''){
                return [];
            }
            return JSON.parse(data);
        } catch (error) {
            if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
                return [];
            }
            throw error;
        }
    }

    private async writeFile(emergencies: Emergency[]): Promise<void>{
        const data = JSON.stringify(emergencies, null, 2);
        await fs.writeFile(this.filePath, data, 'utf-8');
    }

    public async findAll(): Promise<Emergency[]>{
        return this.readFile();
    }

    public async findById(id: string): Promise<Emergency | null>{
        const emergencies = await this.readFile();
        const emergency = emergencies.find(em => em.id === id || em.slug === id);
        return emergency || null;
    }

    public async create(emergency: Emergency): Promise<Emergency>{
        const emergencies = await this.readFile();
        emergencies.push(emergency);
        await this.writeFile(emergencies);
        return emergency;
    }

    public async update(id: string, updatedData: Partial<Emergency>): Promise<Emergency | null>{
        const emergencies = await this.readFile();
        const index = emergencies.findIndex(em => em.id === id || em.slug === id);
        if(index === -1){
            return null;
        }
        emergencies[index] = { ...emergencies[index], ...updatedData };
        await this.writeFile(emergencies);
        return emergencies[index];
    }

    public async delete(id: string): Promise<Emergency | null>{
        const emergencies = await this.readFile();
        const index = emergencies.findIndex(em => em.id === id || em.slug === id);
        if(index === -1){
            return null;
        }
        const deleted = emergencies.splice(index, 1)[0];
        await this.writeFile(emergencies);
        return deleted;
    }
}