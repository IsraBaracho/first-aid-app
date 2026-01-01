import { Request, Response } from 'express';
import { EmergencyService } from '../services/EmergencyService';

export class EmergencyController {
    private service: EmergencyService;

    constructor() {
        this.service = new EmergencyService();
        this.getAll = this.getAll.bind(this);
        this.getById = this.getById.bind(this);
        this.create = this.create.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
    }

    // GET /api/emergencies - Search all emergencies
    async getAll(req: Request, res: Response): Promise<void> {
        try{
            const emergencies = await this.service.getAllEmergencies();
            res.json(emergencies);
        } catch (error){
            res.status(500).json({ error: 'failed to fetch emergencies' });
        }
    }

    // GET /api/emergencies/:id - Search an ID or slug
    async getById(req: Request, res: Response): Promise<void> {
        try{
            const { id } = req.params;
            const emergency = await this.service.getEmergencyById(id);

            if(!emergency){
                res.status(404).json({ error: 'emergency not found' });
                return;
            }
            res.json(emergency);

        } catch (error){
            res.status(500).json({ error: 'failed to fetch emergency' });
        }
    }

    // POST /api/emergencies - Create new
    async create(req: Request, res: Response): Promise<void> {
        try{
            const newEmergency = await this.service.createEmergency(req.body);
            res.status(201).json(newEmergency);
        } catch (error){
            res.status(400).json({error: (error as Error).message});
        }
    }

    // PUT /api/emergencies/:id - Update
    async update(req: Request, res: Response): Promise<void> {
        try{
            const { id } = req.params;
            const updatedEmergency = await this.service.updateEmergency(id, req.body);

            if(!updatedEmergency){
                res.status(404).json({ error: 'emergency not found' });
                return;
            }
            res.json(updatedEmergency);
        } catch (error){
            res.status(500).json({error: 'failed to update emergency'});
        }
    }

    // DELETE /api/emergencies/:id - Delet
    async delete(req: Request, res: Response): Promise<void> {
        try{
            const { id } = req.params;
            const deletedEmergency = await this.service.deleteEmergency(id);

            if(!deletedEmergency){
                res.status(404).json({ error: 'emergency not found' });
                return;
            }
            res.json({ 
                message: 'Emergency deleted successfully',
                deleted: deletedEmergency 
            });
        } catch (error){
            res.status(500).json({ error: 'failed to delete emergency' });
        }
    }
}