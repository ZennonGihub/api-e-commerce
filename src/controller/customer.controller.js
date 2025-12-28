import { CustomerService } from './../services/customers.service.js';

const service = new CustomerService();

export const getList = async (req, res, next) => {
  try {
    const result = await service.findAll();
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

export const createdCustomer = async (req, res, next) => {
  try {
    const result = await service.create(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

export const updatedCustomer = async (req, res, next) => {
  try {
    const result = await service.update(req.params.id, req.user.id, req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

export const removedCustomer = async (req, res, next) => {
  try {
    const result = await service.delete(req.params.id);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};
