import express from 'express';
import passport from 'passport';
import { checkRoles } from '../middlewares/auth.handler.js';
import { getMyOrder } from '../controller/profile.controller.js';

const router = express.Router();

router.get(
  '/my-orders',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin', 'seller', 'user'),
  getMyOrder,
);
export default router;
