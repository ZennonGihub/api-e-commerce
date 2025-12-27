import express  from('express');
import UserServices  from('../services/usuarios.service');


const router = express.Router();
const service = new UserServices();

export const getListUser = async (req, res, next) => {
  try {
    const users = await service.find();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

export const getOneUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await service.findOne(id);
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
    const { id } = req.params;
    await service.delete(id);
    res.json({ message: `Usuario con ID ${id} eliminado correctamente` });
  } catch (error) {
    next(error);
  }
};

export const updatedUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    const changes = req.body;
    const updateuser = await service.update(id, changes);
    res.status(201).json(updateuser);
  } catch (error) {
    next(error);
  }
};

module.exports = router;
