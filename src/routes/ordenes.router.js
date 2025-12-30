import express from 'express';
import { validatorHandler } from '../middlewares/validator.handler.js';
import { checkRoles } from '../middlewares/auth.handler.js';
import {
  getOrderSchema,
  createOrderSchema,
  addItemSchema,
} from '../schemas/order.schema.js';
import passport from 'passport';
import {
  getOneOrder,
  createdOrder,
  addItemOrder,
  updateOrderStatus,
} from '../controller/ordenes.controller.js';

const router = express.Router();

router.get(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin', 'seller', 'user'),
  validatorHandler(getOrderSchema, 'params'),
  getOneOrder,
);

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(createOrderSchema, 'body'),
  createdOrder,
);

router.patch(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin', 'seller'),
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
  updateOrderStatus,
);

router.post(
  '/add-item',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(addItemSchema, 'body'),
  addItemOrder,
);

export default router;
