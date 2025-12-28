import boom from '@hapi/boom';
import { models } from '../libs/sequelize.js';

export class CartUsers {
  constructor() {}

  async getUserAllCarts() {
    const cart = await models.Cart.findAll();
    return cart;
  }

  async findCartByUser(userId) {
    const cart = await models.Cart.findOne({
      where: { idUser: userId },
      include: [
        {
          association: 'items',
          include: ['product'],
        },
      ],
    });
    return cart;
  }

  async getFullItemsCart() {
    const cartItems = await models.CartItem.findAll();
    return cartItems;
  }

  async getOneCart(id) {
    if (!id) throw boom.notFound('Carro de compras no encontrado');
    const cart = await models.Cart.findByPk(id, {
      include: ['items'],
    });
    if (!cart) throw boom.notFound('Carro de compras no encontrado');
    return cart;
  }

  async getOneItemCart(id) {
    if (!id) throw boom.notFound('Item del carro no encontrado');
    const cartItem = await models.CartItem.findByPk(id);
    if (!cartItem) throw boom.notFound('Item del carro no encontrado');
    return cartItem;
  }

  async addItemCart(userId, data) {
    const { productId, quantity } = data;

    let [cart] = await models.Cart.findOrCreate({
      where: { idUser: userId },
      defaults: { idUser: userId }, // Si no existe, se utiliza eso para crear uno nuevo
    });

    // Buscamos si el producto ya esta en el carro
    let cartItem = await models.CartItem.findOne({
      where: {
        idCart: cart.id,
        idProduct: productId,
      },
    });

    // Se decide si se actualiza o se se crea el item
    if (cartItem) {
      // Si el producto ya esta, solo sumamos la cantidad
      cartItem.quantity += quantity;
      await cartItem.save();
      return cartItem;
    } else {
      // Si el producto no esta en el carro, se crea
      const newCartItem = await models.CartItem.create({
        idCart: cart.id,
        idProduct: productId,
        quantity: quantity,
      });
      return newCartItem;
    }
  }

  async updateItem(cartItemId, quantity) {
    const cartItem = await this.getOneItemCart(cartItemId);
    if (cartItem) {
      cartItem.quantity = quantity;
      await cartItem.save();
      return cartItem;
    }
  }

  async removeCart(id) {
    const cartItem = await this.getOneCart(id);
    await cartItem.destroy();
    return { message: 'Carro eliminado' };
  }

  async removeItem(cartItemId) {
    const cartItem = await this.getOneItemCart(cartItemId);
    await cartItem.destroy();
    return { message: 'Producto eliminado del carrito' };
  }
}
