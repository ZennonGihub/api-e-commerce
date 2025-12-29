import { CartService } from '../services/carroDeCompras.service.js';

const service = new CartService();

export const getMyCart = async (req, res, next) => {
  try {
    const userId = req.user.sub;
    const cart = await service.findCartByUser(userId);
    res.json(cart);
  } catch (error) {
    next(error);
  }
};

export const addItem = async (req, res, next) => {
  try {
    const userId = req.user.sub;
    const body = req.body;
    const newItem = await service.addItem(userId, body);
    res.status(201).json(newItem);
  } catch (error) {
    next(error);
  }
};

export const removeItem = async (req, res, next) => {
  try {
    const userId = req.user.sub;
    const { id } = req.params;
    const result = await service.removeItem(id, userId);

    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

export const updateItem = async (req, res, next) => {
  try {
    const userId = req.user.sub;
    const { id } = req.params;
    const { quantity } = req.body;

    const updatedItem = await service.updateItem(id, quantity, userId);

    res.json(updatedItem);
  } catch (error) {
    next(error);
  }
};

export const getAllCarts = async (req, res, next) => {
  try {
    const carts = await service.find();
    res.json(carts);
  } catch (error) {
    next(error);
  }
};
