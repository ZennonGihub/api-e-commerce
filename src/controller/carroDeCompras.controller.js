import { CartUsers } from '../services/carroDeCompras.service.js';
import boom from '@hapi/boom';

const service = new CartUsers();

export const getUserAllCarts = async (req, res, next) => {
  try {
    const cart = await service.getUserAllCarts();
    res.status(200).json(cart);
  } catch (err) {
    next(err);
  }
};

export const getOneCartByUser = async (req, res, next) => {
  try {
    const cart = await service.findCartByUser(user.id);
    res.status(200).json(cart);
  } catch (err) {
    next(err);
  }
};

export const getOneCart = async (req, res, next) => {
  try {
    const cart = await service.findOneCart(req.params.id);
    res.status(200).json(cart);
  } catch (err) {
    next(err);
  }
};

export const updatedCart = async (req, res, next) => {
  try {
    const updatedItem = await service.updateItem(
      req.user.id,
      req.params.id,
      req.body.cantidad,
    );
    res.status(201).json(updatedItem);
  } catch (error) {
    next(error);
  }
};

export const removedCart = async (req, res, next) => {
  try {
    const cartRemoved = await service.removeCart(req.params.id);
    res.status(201).json(cartRemoved);
  } catch (error) {
    next(error);
  }
};

// Parte de los items

export const getOneItemCart = async (req, res, next) => {
  try {
    const result = await service.getOneItemCart(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const addedProduct = async (req, res, next) => {
  try {
    const newItem = await service.addItem(req.body);
    const user = req.user;
    if (user.role !== 'admin' && user.sub.toString() !== id) {
      throw boom.forbidden('No tienes permisos para realizar esa accion');
    }
    res.status(201).json(newItem);
  } catch (error) {
    next(error);
  }
};

export const updatedCartItem = async (req, res, next) => {
  try {
    const updatedCartItem = await service.updateItem(
      req.user.id,
      req.params.id,
      req.body.cantidad,
    );
    res.status(201).json(updatedCartItem);
  } catch (error) {
    next(error);
  }
};

export const removedItem = async (req, res, next) => {
  try {
    const cartItemId = req.params.id;
    const result = await service.removeItem(cartItemId);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};
