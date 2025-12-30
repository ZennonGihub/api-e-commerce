import { OrderService } from '../services/ordenes.service.js';

const service = new OrderService();

export const getOneOrder = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await service.findOne(id);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const getMyOrders = async (req, res, next) => {
  try {
    const userId = req.user.sub;
    const orders = await service.findByUser(userId);
    res.status(200).json(orders);
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
    res.status(201).json(order);
  } catch (error) {
    next(error);
  }
};

export const updateOrderStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const order = await service.updateStatus(id, body);
    res.status(201).json(order);
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
