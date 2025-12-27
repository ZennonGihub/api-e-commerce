import express from 'express';
import passport from 'passport';
import { AuthService } from './../services/auth.service.js';
import { createdUser } from '../controller/usuarios.controller.js';
import {
  recoveryToken,
  changePassword,
  refreshToken,
} from '../controller/auth.controller.js';

const service = new AuthService();
const router = express();

router.post(
  '/login',
  passport.authenticate('local', { session: false }),
  async (req, res, next) => {
    try {
      const user = req.user;
      const { accessToken, refreshToken } = await service.generateToken(user);
      res.cookie('jwt', refreshToken, {
        httpOnly: true,
        sameSite: 'strict',
        secure: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
      res.json({ accessToken, refreshToken });
    } catch (error) {
      next(error);
    }
  },
);

router.post('/register', createdUser);

router.post('/refresh', refreshToken);

router.post('/recovery', recoveryToken);

router.post('/change-password', changePassword);

export default router;
