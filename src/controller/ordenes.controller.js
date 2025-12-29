import { OrderService } from '../services/ordenes.service.js';

const service = new OrderService();

export const getOneOrder = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await service.findOne(id);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const getMyOrders = async (req, res, next) => {
  try {
    const userId = req.user.sub;
    const orders = await service.findByUser(userId);
    res.json(orders);
  } catch (error) {
    next(error);
  }
};

export const createOrder = async (req, res, next) => {
  try {
    const userId = req.user.sub;
    const { idAddress } = req.body;
    const newOrder = await service.create(userId, idAddress);
    res.status(201).json(newOrder);
  } catch (error) {
    next(error);
  }
};

export const updateOrder = async (req, res, next) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const order = await service.update(id, body);
    res.json(order);
  } catch (error) {
    next(error);
  }
};

export const deleteOrder = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await service.delete(id);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};
