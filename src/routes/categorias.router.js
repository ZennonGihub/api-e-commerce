import express from 'express';
import { validatorHandler } from '../middlewares/validator.handler.js';
import { checkRoles } from '../middlewares/auth.handler.js';
import {
  createCategorySchema,
  updateCategorySchema,
  getCategorySchema,
} from '../schemas/categoria.schema.js';
import passport from 'passport';
import {
  getOneCategory,
  getListCategories,
  createCategory,
  updatedCategory,
  removedCategory,
} from '../controller/categorias.controller.js';

const router = express.Router();

router.get('/', getListCategories);

router.get(
  '/:id',
  validatorHandler(getCategorySchema, 'params'),
  getOneCategory,
);

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin', 'seller'),
  validatorHandler(createCategorySchema, 'body'),
  createCategory,
);

router.patch(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin', 'seller'),
  validatorHandler(updateCategorySchema, 'body'),
  validatorHandler(getCategorySchema, 'params'),
  updatedCategory,
);

router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin', 'seller'),
  validatorHandler(getCategorySchema, 'params'),
  removedCategory,
);

export default router;
