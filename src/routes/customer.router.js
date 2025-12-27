import express from 'express';
import { validatorHandler } from '../middlewares/validator.handler.js';
import {
  createCustomerSchema,
  updateCustomerSchema,
  getCustomerSchema,
} from './../schemas/customer.schema.js';
import { checkRoles } from '../middlewares/auth.handler.js';
import passport from 'passport';
import {
  getList,
  createdCustomer,
  updatedCustomer,
  removedCustomer,
} from '../controller/customer.controller.js';

const router = express.Router();

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin', 'seller'),
  getList,
);

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin', 'seller', 'user'),
  validatorHandler(createCustomerSchema, 'body'),
  createdCustomer,
);

router.patch(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin', 'seller', 'user'),
  validatorHandler(getCustomerSchema, 'params'),
  validatorHandler(updateCustomerSchema, 'body'),
  updatedCustomer,
);

router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin', 'seller', 'user'),
  validatorHandler(getCustomerSchema, 'params'),
  removedCustomer,
);

export default router;
