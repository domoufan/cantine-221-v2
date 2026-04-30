const eleveService = require('../services/eleve.service');

class EleveController {
  async getAll(req, res, next) {
    try {
      const eleves = await eleveService.getAll();
      res.json({ success: true, data: eleves, total: eleves.length });
    } catch (err) {
      next(err);
    }
  }

  async getById(req, res, next) {
    try {
      const eleve = await eleveService.getById(Number(req.params.id));
      res.json({ success: true, data: eleve });
    } catch (err) {
      next(err);
    }
  }

  async create(req, res, next) {
    try {
      const eleve = await eleveService.create(req.body);
      res.status(201).json({ success: true, message: 'Élève inscrit avec succès.', data: eleve });
    } catch (err) {
      next(err);
    }
  }

  async update(req, res, next) {
    try {
      const eleve = await eleveService.update(Number(req.params.id), req.body);
      res.json({ success: true, message: 'Élève mis à jour avec succès.', data: eleve });
    } catch (err) {
      next(err);
    }
  }

  async delete(req, res, next) {
    try {
      await eleveService.delete(Number(req.params.id));
      res.json({ success: true, message: 'Élève supprimé avec succès.' });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new EleveController();
