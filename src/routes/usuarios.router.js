import express from 'express';
import validatorHandler from '../middlewares/validator.handler.js';
import {
  createUser,
  updateUser,
  getUser,
  deleteUser,
} from '../schemas/usuarios.schema.js';
import {
  getListUser,
  getOneUser,
  createdUser,
  updatedUser,
  removedUser,
} from '../controller/usuarios.controller.js';
const router = express.Router();

router.get('/lista', getListUser);

router.get('/:id', validatorHandler(getUser, 'params'), getOneUser);

router.delete(
  '/borrarCuenta/:id',
  validatorHandler(deleteUser, 'params'),
  removedUser,
);

router.patch(
  '/cambiarDatos/:id',
  validatorHandler(getUser, 'params'),
  validatorHandler(updateUser, 'body'),
  updateUser,
);

module.exports = router;
