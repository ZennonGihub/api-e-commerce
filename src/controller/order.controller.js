import express from 'express';
import { OrderService } from '../services/order.service.js';

const router = express.Router();
const service = new OrderService();

export const getOneOrder = async (req, res, next) => {
  try {
    const { id } = req.params;
    const order = await service.findOne(id);
    res.json(order);
  } catch (error) {
    next(error);
  }
};

export const createdOrder = async (req, res, next) => {
  try {
    const userId = req.user.sub;
    const newOrder = await service.create(userId);
    res.status(201).json(newOrder);
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
