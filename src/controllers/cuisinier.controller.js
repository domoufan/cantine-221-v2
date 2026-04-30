const cuisinierService = require('../services/cuisinier.service');

class CuisinierController {
  async getAll(req, res, next) {
    try {
      const cuisiniers = await cuisinierService.getAll();
      res.json({ success: true, data: cuisiniers, total: cuisiniers.length });
    } catch (err) {
      next(err);
    }
  }

  async getById(req, res, next) {
    try {
      const cuisinier = await cuisinierService.getById(Number(req.params.id));
      res.json({ success: true, data: cuisinier });
    } catch (err) {
      next(err);
    }
  }

  async create(req, res, next) {
    try {
      const cuisinier = await cuisinierService.create(req.body);
      res.status(201).json({ success: true, message: 'Cuisinier créé avec succès.', data: cuisinier });
    } catch (err) {
      next(err);
    }
  }

  async update(req, res, next) {
    try {
      const cuisinier = await cuisinierService.update(Number(req.params.id), req.body);
      res.json({ success: true, message: 'Cuisinier mis à jour avec succès.', data: cuisinier });
    } catch (err) {
      next(err);
    }
  }

  async delete(req, res, next) {
    try {
      await cuisinierService.delete(Number(req.params.id));
      res.json({ success: true, message: 'Cuisinier supprimé avec succès.' });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new CuisinierController();
