const BaseRepository = require('./BaseRepository');
const prisma = require('../config/db');

class MenuRepository extends BaseRepository {
  constructor() {
    super(prisma.menu);
  }

  async findByDateAndType(date, type) {
    return this.model.findFirst({
      where: {
        date: new Date(date),
        type,
      },
    });
  }

  async findWithDetails(id) {
    return this.model.findUnique({
      where: { id },
      include: {
        cuisinier: { select: { id: true, prenom: true, nom: true, specialite: true } },
        repas: true,
      },
    });
  }

  async countPortionsServies(menuId) {
    return prisma.repas.count({
      where: { menuId, statut: 'SERVI' },
    });
  }

  async hasRepasServi(id) {
    const count = await prisma.repas.count({
      where: { menuId: id, statut: 'SERVI' },
    });
    return count > 0;
  }

  async findAll() {
    return this.model.findMany({
      include: {
        cuisinier: { select: { id: true, prenom: true, nom: true } },
        _count: { select: { repas: true } },
      },
      orderBy: { date: 'desc' },
    });
  }
}

module.exports = new MenuRepository();
