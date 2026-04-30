const BaseRepository = require('./BaseRepository');
const prisma = require('../config/db');

class RepasRepository extends BaseRepository {
  constructor() {
    super(prisma.repas);
  }

  async findByEleveAndMenu(eleveId, menuId) {
    return this.model.findUnique({
      where: { eleveId_menuId: { eleveId, menuId } },
    });
  }

  async findAll() {
    return this.model.findMany({
      include: {
        eleve: { select: { id: true, prenom: true, nom: true, classe: true } },
        menu: { select: { id: true, intitule: true, date: true, type: true } },
      },
      orderBy: { dateService: 'desc' },
    });
  }

  async findById(id) {
    return this.model.findUnique({
      where: { id },
      include: {
        eleve: { select: { id: true, prenom: true, nom: true, classe: true } },
        menu: { select: { id: true, intitule: true, date: true, type: true } },
      },
    });
  }
}

module.exports = new RepasRepository();
