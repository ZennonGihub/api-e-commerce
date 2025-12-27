import express from 'express';
import { CartUsers } from '../services/carroDeCompras.service.js';
import boom from '@hapi/boom';

const router = express.Router();
const service = new CartUsers();

export const getUserCart = async (req, res, next) => {
  try {
    const cart = await service.getCart();
    res.status(200).json(cart);
  } catch (err) {
    next(err);
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

export const updatedCart = async (req, res, next) => {
  try {
    const { cartItemId } = req.params;
    const updatedItem = await service.updateItem(cartItemId, req.body.cantidad);
    const user = req.user;
    if (user.role !== 'admin' && user.sub.toString() !== id) {
      throw boom.forbidden('No tienes permisos para realizar esa accion');
    }
    res.status(200).json(updatedItem);
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
