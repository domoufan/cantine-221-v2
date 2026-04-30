const express = require('express');
const router = express.Router();
const menuController = require('../controllers/menu.controller');
const validate = require('../middlewares/validate');
const { createMenuSchema, updateMenuSchema } = require('../validations/menu.schema');

/**
 * @swagger
 * /menus:
 *   get:
 *     summary: Lister tous les menus
 *     tags: [Menus]
 *     responses:
 *       200:
 *         description: Liste des menus
 */
router.get('/', menuController.getAll.bind(menuController));

/**
 * @swagger
 * /menus/{id}:
 *   get:
 *     summary: Obtenir un menu par ID
 *     tags: [Menus]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Menu trouvé
 *       404:
 *         description: Menu introuvable
 */
router.get('/:id', menuController.getById.bind(menuController));

/**
 * @swagger
 * /menus:
 *   post:
 *     summary: Créer un menu
 *     tags: [Menus]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [date, intitule, type, cuisinierId, portionsPrevues]
 *             properties:
 *               date: { type: string, format: date, example: '2024-12-01' }
 *               intitule: { type: string, example: Thieboudienne }
 *               type: { type: string, enum: [DEJEUNER, GOUTER] }
 *               cuisinierId: { type: integer, example: 1 }
 *               portionsPrevues: { type: integer, example: 100 }
 *     responses:
 *       201:
 *         description: Menu créé
 *       409:
 *         description: Menu déjà existant pour cette date et ce type
 */
router.post('/', validate(createMenuSchema), menuController.create.bind(menuController));

/**
 * @swagger
 * /menus/{id}:
 *   put:
 *     summary: Mettre à jour un menu
 *     tags: [Menus]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Menu mis à jour
 */
router.put('/:id', validate(updateMenuSchema), menuController.update.bind(menuController));

/**
 * @swagger
 * /menus/{id}:
 *   delete:
 *     summary: Supprimer un menu
 *     tags: [Menus]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Menu supprimé
 *       409:
 *         description: Impossible de supprimer (des repas SERVI existent)
 */
router.delete('/:id', menuController.delete.bind(menuController));

module.exports = router;
