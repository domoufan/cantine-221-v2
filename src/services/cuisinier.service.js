const cuisinierRepo = require('../repositories/cuisinier.repo');

class CuisinierService {
  async getAll() {
    return cuisinierRepo.findAll();
  }

  async getById(id) {
    const cuisinier = await cuisinierRepo.findById(id, {
      include: { menus: { select: { id: true, intitule: true, date: true, type: true } } },
    });
    if (!cuisinier) {
      const err = new Error(`Cuisinier avec l'id ${id} introuvable.`);
      err.statusCode = 404;
      throw err;
    }
    return cuisinier;
  }

  async create(data) {
    const existing = await cuisinierRepo.findByEmail(data.email);
    if (existing) {
      const err = new Error(`Un cuisinier avec l'email "${data.email}" existe déjà.`);
      err.statusCode = 409;
      throw err;
    }
    return cuisinierRepo.create(data);
  }

  async update(id, data) {
    await this.getById(id);

    if (data.email) {
      const existing = await cuisinierRepo.findByEmail(data.email);
      if (existing && existing.id !== id) {
        const err = new Error(`L'email "${data.email}" est déjà utilisé.`);
        err.statusCode = 409;
        throw err;
      }
    }

    return cuisinierRepo.update(id, data);
  }

  async delete(id) {
    await this.getById(id);

    const hasMenus = await cuisinierRepo.hasMenus(id);
    if (hasMenus) {
      const err = new Error('Impossible de supprimer ce cuisinier : il est responsable de menus.');
      err.statusCode = 409;
      throw err;
    }

    return cuisinierRepo.delete(id);
  }
}

module.exports = new CuisinierService();
