import express from 'express';
import validatorHandler from '../middlewares/validator.handler';
import {
  createCustomerSchema,
  updateCustomerSchema,
  getCustomerSchema,
} from './../schemas/customer.schema';
import { checkRoles } from '../middlewares/auth.handler';
import passport from 'passport';
import {
  getList,
  createdCustomer,
  updatedCustomer,
  removedCustomer,
} from '../controller/customer.controller';

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

module.exports = router;
