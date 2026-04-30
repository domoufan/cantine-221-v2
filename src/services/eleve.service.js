const eleveRepo = require('../repositories/eleve.repo');

class EleveService {
  async getAll() {
    return eleveRepo.findAll();
  }

  async getById(id) {
    const eleve = await eleveRepo.findById(id);
    if (!eleve) {
      const err = new Error(`Élève avec l'id ${id} introuvable.`);
      err.statusCode = 404;
      throw err;
    }
    return eleve;
  }

  async create(data) {
    return eleveRepo.create(data);
  }

  async update(id, data) {
    await this.getById(id);
    return eleveRepo.update(id, data);
  }

  async delete(id) {
    await this.getById(id);

    const hasRepas = await eleveRepo.hasRepas(id);
    if (hasRepas) {
      const err = new Error('Impossible de supprimer cet élève : il a des repas enregistrés.');
      err.statusCode = 409;
      throw err;
    }

    return eleveRepo.delete(id);
  }
}

module.exports = new EleveService();
