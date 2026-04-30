const express = require('express');
const router = express.Router();
const repasController = require('../controllers/repas.controller');
const validate = require('../middlewares/validate');
const { createRepasSchema } = require('../validations/repas.schema');

/**
 * @swagger
 * /repas:
 *   get:
 *     summary: Lister tous les repas servis
 *     tags: [Repas]
 *     responses:
 *       200:
 *         description: Liste des repas
 */
router.get('/', repasController.getAll.bind(repasController));

/**
 * @swagger
 * /repas/{id}:
 *   get:
 *     summary: Obtenir un repas par ID
 *     tags: [Repas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Repas trouvé
 *       404:
 *         description: Repas introuvable
 */
router.get('/:id', repasController.getById.bind(repasController));

/**
 * @swagger
 * /repas:
 *   post:
 *     summary: Enregistrer un repas
 *     tags: [Repas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [eleveId, menuId, dateService]
 *             properties:
 *               eleveId: { type: integer, example: 1 }
 *               menuId: { type: integer, example: 1 }
 *               dateService: { type: string, format: date, example: '2024-12-01' }
 *               statut: { type: string, enum: [SERVI, ABSENT], default: SERVI }
 *     responses:
 *       201:
 *         description: Repas enregistré
 *       404:
 *         description: Élève ou menu introuvable
 *       409:
 *         description: Doublon ou portions épuisées
 */
router.post('/', validate(createRepasSchema), repasController.create.bind(repasController));

/**
 * @swagger
 * /repas/{id}/statut:
 *   patch:
 *     summary: Mettre à jour le statut d'un repas
 *     tags: [Repas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               statut: { type: string, enum: [SERVI, ABSENT] }
 *     responses:
 *       200:
 *         description: Statut mis à jour
 */
router.patch('/:id/statut', repasController.updateStatut.bind(repasController));

/**
 * @swagger
 * /repas/{id}:
 *   delete:
 *     summary: Supprimer un repas
 *     tags: [Repas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Repas supprimé
 */
router.delete('/:id', repasController.delete.bind(repasController));

module.exports = router;
