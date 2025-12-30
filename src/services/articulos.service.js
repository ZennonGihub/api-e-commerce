import boom from '@hapi/boom';
import { models } from '../libs/sequelize.js';
import { Op } from 'sequelize';

export class ProductsService {
  constructor() {}
  async create(data) {
    if (!data) return null;
    const newProduct = await models.Product.create(data);
    return newProduct;
  }

  async find(query) {
    const { limit, offset, price, priceMin, priceMax, categoryId } = query;

    const options = {
      include: ['category'],
      where: {},
    };
    // Paginacion
    if (limit && offset) {
      options.limit = limit;
      options.offset = offset;
    }
    // Filtros de precios
    if (price) {
      options.where.price = price;
    }

    if (priceMin && priceMax) {
      options.where.price = {
        [Op.gte]: priceMin,
        [Op.lte]: priceMax,
      };
    }

    // Filtros de categorias
    if (categoryId) {
      options.where.idCategory = categoryId;
    }
    const products = await models.Product.findAll(options);
    return products;
  }

  async findOne(id) {
    if (!id) throw boom.notFound('Producto no encontrado');
    const product = await models.Product.findByPk(id, {
      include: ['category'],
    });
    if (!product) throw boom.notFound('Producto no encontrado');
  }

  async update(id, changes) {
    const product = await this.findOne(id);
    const updatedProduct = await product.update(changes);
    return updatedProduct;
  }

  async updateStatus(id, newIdStatus) {
    const product = await this.findOne(id);
    const newProduct = await product.update({
      id_Status: newIdStatus,
    });
    return newProduct;
  }

  async delete(id) {
    const product = await this.findOne(id);
    await product.destroy();
    return { id };
  }
}
