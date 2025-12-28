import { UserServices } from '../services/usuarios.service.js';

const service = new UserServices();

export const getListUser = async (req, res, next) => {
  try {
    const users = await service.findAll();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

export const getOneUser = async (req, res, next) => {
  try {
    const user = await service.findOne(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const createdUser = async (req, res, next) => {
  try {
    const body = req.body;
    const newUser = await service.create(body);
    res.status(201).json(newUser);
  } catch (err) {
    next(err);
  }
};

export const removedUser = async (req, res, next) => {
  try {
    const result = await service.delete(req.params.id);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

export const updatedUser = async (req, res, next) => {
  try {
    const updateuser = await service.update(req.params.id, req.params.changes);
    res.status(201).json(updateuser);
  } catch (error) {
    next(error);
  }
};
