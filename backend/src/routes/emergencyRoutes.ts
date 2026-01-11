import { Router } from 'express';
import { EmergencyController } from '../controllers/EmergencyController';


const router = Router();
const controller = new EmergencyController();

/**
 * @swagger
 * /api/emergencies:
 *   get:
 *     summary: Return all emergencies
 *     description: Retrieve a list of all medical emergencies
 *     tags: [Emergencies]
 *    responses:
 *     200:
 *      description: A list of emergencies
 *     content:
 *       application/json:
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Emergency'
 *     500:
 *      description: Server error
 *    content:
 *     application/json:
 *      schema:
 *     $ref: '#/components/schemas/Error'     
 */
router.get('/emergencies', controller.getAll);

/**
 * @swagger
 * /api/emergencies/{id}:
 *   get:
 *     summary: Seach emergency by ID or slug
 *     description: Return details of a specific emergency using its ID or slug
 *     tags: [Emergencies]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID ou slug da emergência
 *         example: queimadura-de-primeiro-grau-1733328000
 *     responses:
 *       200:
 *         description: Emergency found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Emergency'
 *       404:
 *         description: Emergency not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/emergencies/:id', controller.getById);

/**
 * @swagger
 * /api/emergencies:
 *  post:
 *    summary: Create a new emergency
 *   description: Create a new medical emergency entry
 *   tags: [Emergencies]
 *   requestBody:
 *    required: true
 *   content:
 *     application/json:
 *      schema:
 *        $ref: '#/components/schemas/Emergency'
 *  responses:
 *    201:
 *      description: Emergency created successfully
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Emergency'
 *    400:
 *      description: Bad request
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Error'
 */
router.post('/emergencies', controller.create);

/**
 * @swagger
 * /api/emergencies/{id}:
 *   put:
 *     summary: Update an existing emergency
 *     description: Update the data of an emergency. All fields are optional. If the title is changed, the slug will be regenerated.
 *     tags: [Emergencies]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID ou slug da emergência
 *         example: queimadura-de-primeiro-grau-1733328000
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateEmergencyDTO'
 *     responses:
 *       200:
 *         description: Emergency updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Emergency'
 *       404:
 *         description: Emergency not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.put('/emergencies/:id', controller.update);

/**
 * @swagger
 * /api/emergencies/{id}:
 *   delete:
 *     summary: Delete an emergency
 *     description: Remove a medical emergency from the database
 *     tags: [Emergencies]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID ou slug da emergência
 *         example: queimadura-de-primeiro-grau-1733328000
 *     responses:
 *       200:
 *         description: Emergency deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Emergency deleted successfully
 *                 deleted:
 *                   $ref: '#/components/schemas/Emergency'
 *       404:
 *         description: Emergency not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.delete('/emergencies/:id', controller.delete);


export default router;