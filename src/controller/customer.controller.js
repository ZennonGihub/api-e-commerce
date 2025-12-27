import express  from ('express');
import CustomerService  from ('./../services/customers.services');


const router = express.Router();
const service = new CustomerService();

export const getList = async (req, res, next) => {
  try {
    res.json(await service.find());
  } catch (error) {
    next(error);
  }
};

export const createdCustomer = async (req, res, next) => {
  try {
    const body = req.body;
    res.status(201).json(await service.create(body));
  } catch (error) {
    next(error);
  }
};

export const updatedCustomer = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = req.user;
    const body = req.body;
    if (user.role !== 'admin' && user.sub.toString() !== id) {
      throw boom.forbidden(`No tienes permiso de realizar esta accion.`);
    }
    res.status(201).json(await service.update(id, body));
  } catch (error) {
    next(error);
  }
};

export const removedCustomer = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = req.user;
    if (user.role !== 'admin' && user.sub.toString() !== id) {
      throw boom.forbidden(`No tienes permiso de realizar esta accion.`);
    }
    res.status(201).json(await service.delete(id));
  } catch (error) {
    next(error);
  }
};

module.exports = router;
