const repasRepo = require('../repositories/repas.repo');
const eleveRepo = require('../repositories/eleve.repo');
const menuRepo = require('../repositories/menu.repo');

class RepasService {
  async getAll() {
    return repasRepo.findAll();
  }

  async getById(id) {
    const repas = await repasRepo.findById(id);
    if (!repas) {
      const err = new Error(`Repas avec l'id ${id} introuvable.`);
      err.statusCode = 404;
      throw err;
    }
    return repas;
  }

  async create(data) {
    // Vérifier existence élève
    const eleve = await eleveRepo.findById(data.eleveId);
    if (!eleve) {
      const err = new Error(`Élève avec l'id ${data.eleveId} introuvable.`);
      err.statusCode = 404;
      throw err;
    }

    // Vérifier existence menu
    const menu = await menuRepo.findById(data.menuId);
    if (!menu) {
      const err = new Error(`Menu avec l'id ${data.menuId} introuvable.`);
      err.statusCode = 404;
      throw err;
    }

    // Vérifier doublon (eleveId, menuId)
    const doublon = await repasRepo.findByEleveAndMenu(data.eleveId, data.menuId);
    if (doublon) {
      const err = new Error('Cet élève a déjà un repas enregistré pour ce menu.');
      err.statusCode = 409;
      throw err;
    }

    // Vérifier portions disponibles
    const portionsServies = await menuRepo.countPortionsServies(data.menuId);
    if (portionsServies >= menu.portionsPrevues) {
      const err = new Error(
        `Portions épuisées pour ce menu. Maximum prévu : ${menu.portionsPrevues}, déjà servi : ${portionsServies}.`
      );
      err.statusCode = 409;
      throw err;
    }

    return repasRepo.create({
      ...data,
      dateService: new Date(data.dateService),
      statut: data.statut || 'SERVI',
    });
  }

  async updateStatut(id, statut) {
    await this.getById(id);
    return repasRepo.update(id, { statut });
  }

  async delete(id) {
    await this.getById(id);
    return repasRepo.delete(id);
  }
}

module.exports = new RepasService();
