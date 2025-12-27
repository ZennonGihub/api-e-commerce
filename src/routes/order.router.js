import express from 'express';
import validatorHandler from '../middlewares/validator.handler';
import { checkRoles } from './../middlewares/auth.handler';
import {
  getOrderSchema,
  createOrderSchema,
  addItemSchema,
} from './../schemas/order.schema';
import passport from 'passport';
import {
  getOneOrder,
  createdOrder,
  addItemOrder,
} from '../controller/order.controller';

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

module.exports = router;
