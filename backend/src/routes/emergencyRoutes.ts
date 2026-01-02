import { Router } from 'express';
import { EmergencyController } from '../controllers/EmergencyController';


const router = Router();
const controller = new EmergencyController();



// GET /api/emergencies - Search all emergencies
router.get('/emergencies', controller.getAll);

// GET /api/emergencies/:id - Search emergency by ID or slug
router.get('/emergencies/:id', controller.getById);

// POST /api/emergencies - Create new emergency
router.post('/emergencies', controller.create);

// PUT /api/emergencies/:id - Update emergency
router.put('/emergencies/:id', controller.update);

// DELETE /api/emergencies/:id - Delete emergency
router.delete('/emergencies/:id', controller.delete);


export default router;