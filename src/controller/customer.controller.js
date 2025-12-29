import { CustomerService } from '../services/customers.service.js';

const service = new CustomerService();

export const getCustomers = async (req, res, next) => {
  try {
    const result = await service.find();
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const createCustomer = async (req, res, next) => {
  try {
    const body = req.body;
    const result = await service.create(body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

export const updateCustomer = async (req, res, next) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const result = await service.update(id, body);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const deleteCustomer = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await service.delete(id);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};
