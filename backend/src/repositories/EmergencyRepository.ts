import fs from 'fs/promises';
import path from 'path';
import { Emergency } from '../models/Emergency';

export class EmergencyRepository {
    private filePath: string;

    constructor(){
        this.filePath = path.join(__dirname, '../../data/emergencies.json');
    }

    private async readFile(): Promise<Emergency[]>{
        const data = await fs.readFile(this.filePath, 'utf-8');
        return JSON.parse(data);
    }
}