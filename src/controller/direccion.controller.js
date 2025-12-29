import { AddressService } from '../services/direccion.service.js';

const service = new AddressService();

export const getMyAddresses = async (req, res, next) => {
  try {
    const addresses = await service.findByUser(req.user.id);
    res.json(addresses);
  } catch (error) {
    next(error);
  }
};

export const createAddress = async (req, res, next) => {
  try {
    const newAddress = await service.create(req.params.id, req.body);
    res.status(201).json(newAddress);
  } catch (error) {
    next(error);
  }
};

export const deleteAddress = async (req, res, next) => {
  try {
    await service.delete(req.params.id, req.user.id);
    res.status(204).json({ message: 'Dirección eliminada' });
  } catch (error) {
    next(error);
  }
};
