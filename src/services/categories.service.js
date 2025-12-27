import boom from ('@hapi/boom');
import { models } from ('../libs/sequelize');

class CategoryService {
  constructor() {}
  async create(data) {
    if (!data) {
      throw boom.notData('No se ingresaro toda la informacion');
    }
    const newCategory = await models.Category.create(data);
    return newCategory;
  }

  async find() {
    const categories = await models.Category.findAll();
    return categories;
  }

  async findOne(id) {
    if (!id) {
      throw boom.notFount('No se encontro la categoria');
    }
    const category = await models.Category.findByPk(id, {
      include: ['products'],
    });
    return category;
  }

  async update(id, changes) {
    const category = this.findOne(id);
    if (!changes) {
      throw boom.notData('No se proporciono la informacion suficiente');
    }
    const newCategory = await category.update(changes);
    return newCategory;
  }

  async delete(id) {
    const categoryRemoved = this.findOne(id);
    categoryRemoved.destroy();
    return id;
  }
}

module.exports = CategoryService;
