import express from 'express';
import { validatorHandler } from '../middlewares/validator.handler.js';
import { checkRoles } from './../middlewares/auth.handler.js';
import {
  getOrderSchema,
  createOrderSchema,
  addItemSchema,
} from './../schemas/order.schema.js';
import passport from 'passport';
import {
  getOneOrder,
  createdOrder,
  addItemOrder,
} from '../controller/order.controller.js';

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

router.post(
  '/add-item',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(addItemSchema, 'body'),
  addItemOrder,
);

export default router;
