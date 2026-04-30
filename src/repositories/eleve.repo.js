const BaseRepository = require('./BaseRepository');
const prisma = require('../config/db');

class EleveRepository extends BaseRepository {
  constructor() {
    super(prisma.eleve);
  }

  async findWithRepas(id) {
    return this.model.findUnique({
      where: { id },
      include: { repas: true },
    });
  }

  async hasRepas(id) {
    const count = await prisma.repas.count({ where: { eleveId: id } });
    return count > 0;
  }

  async findAll() {
    return this.model.findMany({
      orderBy: [{ nom: 'asc' }, { prenom: 'asc' }],
    });
  }
}

module.exports = new EleveRepository();
