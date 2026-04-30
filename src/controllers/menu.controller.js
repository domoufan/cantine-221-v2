const menuService = require('../services/menu.service');

class MenuController {
  async getAll(req, res, next) {
    try {
      const menus = await menuService.getAll();
      res.json({ success: true, data: menus, total: menus.length });
    } catch (err) {
      next(err);
    }
  }

  async getById(req, res, next) {
    try {
      const menu = await menuService.getById(Number(req.params.id));
      res.json({ success: true, data: menu });
    } catch (err) {
      next(err);
    }
  }

  async create(req, res, next) {
    try {
      const menu = await menuService.create(req.body);
      res.status(201).json({ success: true, message: 'Menu créé avec succès.', data: menu });
    } catch (err) {
      next(err);
    }
  }

  async update(req, res, next) {
    try {
      const menu = await menuService.update(Number(req.params.id), req.body);
      res.json({ success: true, message: 'Menu mis à jour avec succès.', data: menu });
    } catch (err) {
      next(err);
    }
  }

  async delete(req, res, next) {
    try {
      await menuService.delete(Number(req.params.id));
      res.json({ success: true, message: 'Menu supprimé avec succès.' });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new MenuController();
