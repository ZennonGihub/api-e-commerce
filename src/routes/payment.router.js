import express from 'express';
import passport from 'passport';
import {
  getMethods,
  processPayment,
} from '../controller/payment.controller.js';

const router = express.Router();

router.use(passport.authenticate('jwt', { session: false }));

router.get('/methods', getMethods);
router.post('/', processPayment);

export default router;
