import express from 'express';
import { validatorHandler } from './../middlewares/validator.handler.js';
import {
  updateItemSchema,
  addItemSchema,
} from '../schemas/carroDeCompras.schema.js';
import passport from 'passport';
import { checkRoles } from './../middlewares/auth.handler.js';
import {
  getUserCart,
  addedProduct,
  updatedCart,
  removedItem,
} from '../controller/carroDeCompras.controller.js';

const router = express.Router();

router.get(
  '/lista',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin', 'seller', 'user'),
  getUserCart,
);

router.post(
  '/agregar',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin', 'seller', 'user'),
  validatorHandler(addItemSchema, 'body'),
  addedProduct,
);

router.patch(
  '/cambiarCarro/:cartItemId',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin', 'seller', 'user'),
  validatorHandler(updateItemSchema, 'body'),
  updatedCart,
);

router.delete(
  '/remove/:cartItemId',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin', 'seller', 'user'),
  removedItem,
);

export default router;
