import boom from ('@hapi/boom');
import { models } from ('../libs/sequelize');
import { Op } from ('sequelize');

class ProductsService {
  constructor() {}
  async create(data) {
    if (!data) return null;
    const newProduct = await models.Product.create(data);
    return newProduct;
  }

  async find(query) {
    const { limit, offset, price, priceMin, priceMax } = query;

    const options = {
      include: ['category'],
      where: { id_categoria: id_categoria },
    };
    if (limit && offset) {
      options.limit = limit;
      options.offset = offset;
    }
    if (price) {
      options.where.price = price;
    }

    if (priceMin && priceMax) {
      options.where.price = {
        [Op.gte]: priceMin,
        [Op.lte]: priceMax,
      };
    }

    const products = await models.Product.findAll(options);
    return products;
  }

  async findOne(id) {
    if (!id) {
      throw boom.notFound('Producto no encontrado');
    }
    const product = await models.Product.findByPk(id);
    return product;
  }

  async update(id, changes) {
    const product = this.Product.findOne(id);
    const updatedProduct = Object.assign(product, changes);
    return updatedProduct;
  }

  async delete(id) {
    const index = this.Product.findIndex((item) => item.id === id);
    if (index === -1) {
      throw boom.notFound('product not found');
    }
    this.products.splice(index, 1);
    return { id };
  }
}

module.exports = ProductsService;
