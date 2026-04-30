const menuRepo = require('../repositories/menu.repo');
const cuisinierRepo = require('../repositories/cuisinier.repo');

class MenuService {
  async getAll() {
    return menuRepo.findAll();
  }

  async getById(id) {
    const menu = await menuRepo.findWithDetails(id);
    if (!menu) {
      const err = new Error(`Menu avec l'id ${id} introuvable.`);
      err.statusCode = 404;
      throw err;
    }
    return menu;
  }

  async create(data) {
    // Vérifier existence du cuisinier
    const cuisinier = await cuisinierRepo.findById(data.cuisinierId);
    if (!cuisinier) {
      const err = new Error(`Cuisinier avec l'id ${data.cuisinierId} introuvable.`);
      err.statusCode = 404;
      throw err;
    }

    // Vérifier unicité (date, type)
    const existing = await menuRepo.findByDateAndType(data.date, data.type);
    if (existing) {
      const err = new Error(
        `Un menu de type "${data.type}" existe déjà pour la date "${new Date(data.date).toLocaleDateString('fr-FR')}".`
      );
      err.statusCode = 409;
      throw err;
    }

    return menuRepo.create({
      ...data,
      date: new Date(data.date),
    });
  }

  async update(id, data) {
    await this.getById(id);

    if (data.cuisinierId) {
      const cuisinier = await cuisinierRepo.findById(data.cuisinierId);
      if (!cuisinier) {
        const err = new Error(`Cuisinier avec l'id ${data.cuisinierId} introuvable.`);
        err.statusCode = 404;
        throw err;
      }
    }

    if (data.date || data.type) {
      const current = await menuRepo.findById(id);
      const checkDate = data.date ? new Date(data.date) : current.date;
      const checkType = data.type || current.type;

      const existing = await menuRepo.findByDateAndType(checkDate, checkType);
      if (existing && existing.id !== id) {
        const err = new Error(`Un menu de type "${checkType}" existe déjà pour cette date.`);
        err.statusCode = 409;
        throw err;
      }
    }

    const updateData = { ...data };
    if (data.date) updateData.date = new Date(data.date);

    return menuRepo.update(id, updateData);
  }

  async delete(id) {
    await this.getById(id);

    const hasRepasServi = await menuRepo.hasRepasServi(id);
    if (hasRepasServi) {
      const err = new Error('Impossible de supprimer ce menu : il contient des repas SERVI.');
      err.statusCode = 409;
      throw err;
    }

    return menuRepo.delete(id);
  }
}

module.exports = new MenuService();
