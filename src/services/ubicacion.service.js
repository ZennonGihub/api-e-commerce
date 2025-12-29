import { models } from '../libs/sequelize.js';

export class LocationService {
  constructor() {}

  async findAll() {
    return await models.Region.findAll({
      include: [
        {
          association: 'cities',
          attributes: ['id', 'name'],
        },
      ],
    });
  }

  async findCitiesByRegion(regionId) {
    return await models.City.findAll({
      where: { idRegion: regionId },
      order: [['name', 'ASC']],
    });
  }
}
