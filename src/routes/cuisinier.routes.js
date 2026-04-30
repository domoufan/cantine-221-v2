const express = require('express');
const router = express.Router();
const cuisinierController = require('../controllers/cuisinier.controller');
const validate = require('../middlewares/validate');
const { createCuisinierSchema, updateCuisinierSchema } = require('../validations/cuisinier.schema');

/**
 * @swagger
 * /cuisiniers:
 *   get:
 *     summary: Lister tous les cuisiniers
 *     tags: [Cuisiniers]
 *     responses:
 *       200:
 *         description: Liste des cuisiniers
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean }
 *                 data:
 *                   type: array
 *                   items: { $ref: '#/components/schemas/Cuisinier' }
 *                 total: { type: integer }
 */
router.get('/', cuisinierController.getAll.bind(cuisinierController));

/**
 * @swagger
 * /cuisiniers/{id}:
 *   get:
 *     summary: Obtenir un cuisinier par ID
 *     tags: [Cuisiniers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Cuisinier trouvé
 *       404:
 *         description: Cuisinier introuvable
 */
router.get('/:id', cuisinierController.getById.bind(cuisinierController));

/**
 * @swagger
 * /cuisiniers:
 *   post:
 *     summary: Créer un cuisinier
 *     tags: [Cuisiniers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [prenom, nom, email, specialite]
 *             properties:
 *               prenom: { type: string, example: Mamadou }
 *               nom: { type: string, example: Diallo }
 *               email: { type: string, example: mamadou@cantine221.sn }
 *               telephone: { type: string, example: '+221771234567' }
 *               specialite: { type: string, example: cuisine africaine }
 *     responses:
 *       201:
 *         description: Cuisinier créé
 *       400:
 *         description: Données invalides
 *       409:
 *         description: Email déjà utilisé
 */
router.post('/', validate(createCuisinierSchema), cuisinierController.create.bind(cuisinierController));

/**
 * @swagger
 * /cuisiniers/{id}:
 *   put:
 *     summary: Mettre à jour un cuisinier
 *     tags: [Cuisiniers]
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
 *             $ref: '#/components/schemas/Cuisinier'
 *     responses:
 *       200:
 *         description: Cuisinier mis à jour
 *       404:
 *         description: Cuisinier introuvable
 */
router.put('/:id', validate(updateCuisinierSchema), cuisinierController.update.bind(cuisinierController));

/**
 * @swagger
 * /cuisiniers/{id}:
 *   delete:
 *     summary: Supprimer un cuisinier
 *     tags: [Cuisiniers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Cuisinier supprimé
 *       409:
 *         description: Impossible de supprimer (a des menus)
 */
router.delete('/:id', cuisinierController.delete.bind(cuisinierController));

module.exports = router;
