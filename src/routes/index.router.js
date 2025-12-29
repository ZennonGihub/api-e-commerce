import express from 'express';

import { checkApiKey } from '../middlewares/auth.handler.js';
import articulosRouter from './articulos.router.js';
import carritoDeCompras from './carroDeCompras.router.js';
import usuarioRouter from './usuarios.router.js';
import customeRouter from './customer.router.js';
import categoriesRouter from './categorias.router.js';
import orderRouter from './ordenes.router.js';
import authRouter from './auth.router.js';
import profileRouter from './profile.router.js';

export function routerApi(app) {
  const router = express.Router();
  router.use(checkApiKey);

  app.use('/api/v1', router);

  router.use('/products', articulosRouter);
  router.use('/carro', carritoDeCompras);
  router.use('/users', usuarioRouter);
  router.use('/customer', customeRouter);
  router.use('/categories', categoriesRouter);
  router.use('/order', orderRouter);
  router.use('/auth', authRouter);
  router.use('/profile', profileRouter);
}
