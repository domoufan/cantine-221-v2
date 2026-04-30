const BaseRepository = require('./BaseRepository');
const prisma = require('../config/db');

class CuisinierRepository extends BaseRepository {
  constructor() {
    super(prisma.cuisinier);
  }

  async findByEmail(email) {
    return this.model.findUnique({ where: { email } });
  }

  async findWithMenus(id) {
    return this.model.findUnique({
      where: { id },
      include: { menus: true },
    });
  }

  async hasMenus(id) {
    const count = await prisma.menu.count({ where: { cuisinierId: id } });
    return count > 0;
  }

  async findAll() {
    return this.model.findMany({
      include: { menus: { select: { id: true, intitule: true, date: true } } },
      orderBy: { nom: 'asc' },
    });
  }
}

module.exports = new CuisinierRepository();
