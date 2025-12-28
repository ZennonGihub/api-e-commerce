import { OrderService } from '../services/order.service.js';

const service = new OrderService();

export const getMyOrder = async (req, res, next) => {
  try {
    const user = req.user;
    const orders = await service.findByUser(user.sub);
    res.json(orders);
  } catch (error) {
    next(error);
  }
};
