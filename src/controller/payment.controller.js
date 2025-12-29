import { PaymentService } from '../services/payment.service.js';

const service = new PaymentService();

export const getMethods = async (req, res, next) => {
  try {
    const methods = await service.getPaymentMethods();
    res.json(methods);
  } catch (error) {
    next(error);
  }
};

export const processPayment = async (req, res, next) => {
  try {
    const body = req.body;
    const result = await service.create(body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};
