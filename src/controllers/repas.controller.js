const repasService = require('../services/repas.service');

class RepasController {
  async getAll(req, res, next) {
    try {
      const repas = await repasService.getAll();
      res.json({ success: true, data: repas, total: repas.length });
    } catch (err) {
      next(err);
    }
  }

  async getById(req, res, next) {
    try {
      const repas = await repasService.getById(Number(req.params.id));
      res.json({ success: true, data: repas });
    } catch (err) {
      next(err);
    }
  }

  async create(req, res, next) {
    try {
      const repas = await repasService.create(req.body);
      res.status(201).json({ success: true, message: 'Repas enregistré avec succès.', data: repas });
    } catch (err) {
      next(err);
    }
  }

  async updateStatut(req, res, next) {
    try {
      const { statut } = req.body;
      if (!['SERVI', 'ABSENT'].includes(statut)) {
        return res.status(400).json({ success: false, message: 'Statut invalide. Valeurs acceptées : SERVI, ABSENT.' });
      }
      const repas = await repasService.updateStatut(Number(req.params.id), statut);
      res.json({ success: true, message: 'Statut du repas mis à jour.', data: repas });
    } catch (err) {
      next(err);
    }
  }

  async delete(req, res, next) {
    try {
      await repasService.delete(Number(req.params.id));
      res.json({ success: true, message: 'Repas supprimé avec succès.' });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new RepasController();
