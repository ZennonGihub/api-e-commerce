import express from 'express';
import validatorHandler from '../middlewares/validator.handler';
import {
  createProductSchema,
  updateProductSchema,
  getProductSchema,
  queryProductSchema,
} from '../schemas/product.schema';
import passport from 'passport';
import { checkRoles } from './../middlewares/auth.handler';
import {
  getListProduct,
  getOneProduct,
  createProduct,
  updateProduct,
  deletedProduct,
} from '../controller/articulos.controller';

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

module.exports = router;
