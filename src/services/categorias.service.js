import boom from '@hapi/boom';
import { models } from '../libs/sequelize.js';

export class CategoryService {
  constructor() {}
  async create(data) {
    if (!data) {
      throw boom.badRequest('No se ingreso toda la informacion');
    }
    const newCategory = await models.Category.create(data);
    return newCategory;
  }

  async find() {
    const categories = await models.Category.findAll();
    return categories;
  }

  async findOne(id) {
    if (!id) throw boom.notFound('No se encontro la categoria');
    const category = await models.Category.findByPk(id, {
      include: ['products'],
    });
    if (!category) throw boom.notFound('No se encontro la categoria');
    return category;
  }

  async update(id, changes) {
    const category = await this.findOne(id);
    if (!changes) {
      throw boom.badRequest('No se proporciono la informacion suficiente');
    }
    const newCategory = await category.update(changes);
    return newCategory;
  }

  async delete(id) {
    const categoryRemoved = await this.findOne(id);
    await categoryRemoved.destroy();
    return id;
  }
}
