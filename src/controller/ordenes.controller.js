import { OrderService } from '../services/order.service.js';

const service = new OrderService();

export const getOneOrder = async (req, res, next) => {
  try {
    const result = await service.findOne(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const getAllOrders = async (req, res, next) => {
  try {
    const newOrder = await service.findUserAllOrders(req.user.id);
    res.status(201).json(newOrder);
  } catch (error) {
    next(error);
  }
};

export const createdOrder = async (req, res, next) => {
  try {
    const newOrder = await service.create(req.user.id, req.body);
    res.status(201).json(newOrder);
  } catch (error) {
    next(error);
  }
};

export const updateOrder = async (req, res, next) => {
  try {
    const newOrder = await service.updateOrder(
      req.user.id,
      req.body,
      req.params.id,
    );
    res.status(201).json(newOrder);
  } catch (error) {
    next(error);
  }
};

export const deletedOrder = async (req, res, next) => {
  try {
    const result = await service.deletedOrder(req.paramssssss.id);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

export const addItemOrder = async (req, res, next) => {
  try {
    const body = req.body;
    const newItem = await service.addItem(body);
    res.status(201).json(newItem);
  } catch (error) {
    next(error);
  }
};
