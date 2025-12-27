import express  from ('express');
import OrderService  from ('../services/order.service');

const router = express.Router();
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

module.exports = router;
