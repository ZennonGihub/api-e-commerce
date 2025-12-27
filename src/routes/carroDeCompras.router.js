import express from 'express';
import validatorHandler from '../middlewares/validator.handler';
import {
  updateItemSchema,
  addItemSchema,
} from '../schemas/carroDeCompras.schema';
import passport from 'passport';
import { checkRoles } from '../middlewares/auth.handler';
import {
  getUserCart,
  addedProduct,
  updatedCart,
} from '../controller/carroDeCompras.router';
import { removedItem } from '../controller/carroDeCompras.controller';

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

module.exports = router;
