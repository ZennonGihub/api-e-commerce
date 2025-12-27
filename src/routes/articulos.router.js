import express from 'express';
import { validatorHandler } from './../middlewares/validator.handler.js';
import {
  createProductSchema,
  updateProductSchema,
  getProductSchema,
  queryProductSchema,
} from '../schemas/product.schema.js';
import passport from 'passport';
import { checkRoles } from './../middlewares/auth.handler.js';
import {
  getListProduct,
  getOneProduct,
  createProduct,
  updateProduct,
  deletedProduct,
} from '../controller/articulos.controller.js';

const router = express.Router();

router.get('/', validatorHandler(queryProductSchema, 'query'), getListProduct);

router.get('/:id', validatorHandler(getProductSchema, 'params'), getOneProduct);

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin', 'seller'),
  validatorHandler(createProductSchema, 'body'),
  createProduct,
);

router.patch(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin', 'seller'),
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
  updateProduct,
);

router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin', 'seller'),
  validatorHandler(getProductSchema, 'body'),
  deletedProduct,
);

export default router;
