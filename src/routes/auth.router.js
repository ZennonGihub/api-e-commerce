import express from 'express';
import passport from 'passport';
import { AuthService } from './../services/auth.service.js';
import { createdUser } from '../controller/usuarios.controller.js';
import {
  getToken,
  recoveryToken,
  changePassword,
  refreshToken,
} from '../controller/auth.controller.js';

const router = express();

router.post(
  '/login',
  passport.authenticate('local', { session: false }),
  getToken,
);

router.post('/register', createdUser);

router.post('/refresh', refreshToken);

router.post('/recovery', recoveryToken);

router.post('/change-password', changePassword);

export default router;
