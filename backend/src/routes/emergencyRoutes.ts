import { Router } from "express";
import { EmergencyController } from "../controllers/EmergencyController";

const router = Router();
const controller = new EmergencyController();

/**
 * @swagger
 * /api/emergencies:
 *   get:
 *     summary: Lista todas as emergências
 *     description: Retorna um array com todas as emergências cadastradas
 *     tags:
 *       - Emergencies
 *     responses:
 *       200:
 *         description: Lista de emergências
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Emergency'
 *       500:
 *         description: Erro no servidor
 */
router.get("/emergencies", controller.getAll);

/**
 * @swagger
 * /api/emergencies/{id}:
 *   get:
 *     summary: Busca uma emergência por ID ou slug
 *     tags:
 *       - Emergencies
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID ou slug da emergência
 *     responses:
 *       200:
 *         description: Emergência encontrada
 *       404:
 *         description: Emergência não encontrada
 */
router.get("/emergencies/:id", controller.getById);

/**
 * @swagger
 * /api/emergencies:
 *   post:
 *     summary: Cria uma nova emergência
 *     tags:
 *       - Emergencies
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateEmergencyDTO'
 *     responses:
 *       201:
 *         description: Emergência criada com sucesso
 *       400:
 *         description: Dados inválidos
 */
router.post("/emergencies", controller.create);

/**
 * @swagger
 * /api/emergencies/{id}:
 *   put:
 *     summary: Atualiza uma emergência existente
 *     tags:
 *       - Emergencies
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateEmergencyDTO'
 *     responses:
 *       200:
 *         description: Emergência atualizada
 *       404:
 *         description: Emergência não encontrada
 */
router.put("/emergencies/:id", controller.update);

/**
 * @swagger
 * /api/emergencies/{id}:
 *   delete:
 *     summary: Deleta uma emergência
 *     tags:
 *       - Emergencies
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Emergência deletada com sucesso
 *       404:
 *         description: Emergência não encontrada
 */
router.delete("/emergencies/:id", controller.delete);

export default router;
