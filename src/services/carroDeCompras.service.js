import boom from '@hapi/boom';
import { models } from '../libs/sequelize.js';

export class CartUsers {
  constructor() {}

  async getUserCart() {
    const cart = await models.cart.findAll();
    return cart;
  }

  async getItemCart(id) {
    if (id) {
      throw boom.notFound('Item del carro no encontrado');
    }
    const cartItem = await models.Cart.findByPk(id);
    if (!cartItem) {
      throw boom.notFound('Item del carro no encontrado');
    }
    return cartItem;
  }

  async addItemCart(data) {
    const { itemId } = data;
    const cartItem = this.getItemCart(itemId);
    if (cartItem) {
      cartItem.amount += amount;
      await cartItem.save();
      return cartItem;
    }
    const newItem = await models.Cart.create({ userId, productId, cantidad });
    return newItem;
  }

  async uptadeItem(cartItemId, amount) {
    const cartItem = this.getItemCart(cartItemId);
    if (cartItem) {
      cartItem.cantidad = amount;
      await cartItem.save();
      return cartItem;
    }
  }

  async removeItem(cartItemId) {
    const cartItem = this.getItemCart(cartItemId);
    await cartItem.destroy();
    return { message: 'Producto eliminado del carrito' };
  }
}
