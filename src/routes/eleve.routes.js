const express = require('express');
const router = express.Router();
const eleveController = require('../controllers/eleve.controller');
const validate = require('../middlewares/validate');
const { createEleveSchema, updateEleveSchema } = require('../validations/eleve.schema');

/**
 * @swagger
 * /eleves:
 *   get:
 *     summary: Lister tous les élèves inscrits
 *     tags: [Eleves]
 *     responses:
 *       200:
 *         description: Liste des élèves
 */
router.get('/', eleveController.getAll.bind(eleveController));

/**
 * @swagger
 * /eleves/{id}:
 *   get:
 *     summary: Obtenir un élève par ID
 *     tags: [Eleves]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Élève trouvé
 *       404:
 *         description: Élève introuvable
 */
router.get('/:id', eleveController.getById.bind(eleveController));

/**
 * @swagger
 * /eleves:
 *   post:
 *     summary: Inscrire un élève
 *     tags: [Eleves]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [prenom, nom, classe, regimeAlimentaire, telephoneParent]
 *             properties:
 *               prenom: { type: string, example: Fatou }
 *               nom: { type: string, example: Ndiaye }
 *               classe: { type: string, example: '6ème A' }
 *               regimeAlimentaire: { type: string, enum: [NORMAL, VEGETARIEN, SANS_GLUTEN] }
 *               telephoneParent: { type: string, example: '+221770000000' }
 *     responses:
 *       201:
 *         description: Élève inscrit
 *       400:
 *         description: Données invalides
 */
router.post('/', validate(createEleveSchema), eleveController.create.bind(eleveController));

/**
 * @swagger
 * /eleves/{id}:
 *   put:
 *     summary: Mettre à jour un élève
 *     tags: [Eleves]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Élève mis à jour
 */
router.put('/:id', validate(updateEleveSchema), eleveController.update.bind(eleveController));

/**
 * @swagger
 * /eleves/{id}:
 *   delete:
 *     summary: Supprimer un élève
 *     tags: [Eleves]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Élève supprimé
 *       409:
 *         description: Impossible de supprimer (a des repas)
 */
router.delete('/:id', eleveController.delete.bind(eleveController));

module.exports = router;
