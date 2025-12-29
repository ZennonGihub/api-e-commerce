import { config } from '../config/config.js';
import { AuthService } from '../services/auth.service.js';

const service = new AuthService();

export const login = async (req, res, next) => {
  try {
    const user = req.user;
    const { accessToken, refreshToken } = service.signToken(user);
    res.cookie('jwt', refreshToken, {
      httpOnly: true,
      sameSite: 'strict',
      secure: config.isProd,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({
      user,
      accessToken,
    });
  } catch (error) {
    next(error);
  }
};

export const refreshToken = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    const rta = await service.refreshToken(token);
    res.json(rta);
  } catch (error) {
    next(error);
  }
};

export const recovery = async (req, res, next) => {
  try {
    const { email } = req.body;
    const rta = await service.sendRecoveryPassword(email);
    res.json(rta);
  } catch (error) {
    next(error);
  }
};

export const changePassword = async (req, res, next) => {
  try {
    const { token, newPassword } = req.body;
    const rta = await service.changePassword(token, newPassword);
    res.json(rta);
  } catch (error) {
    next(error);
  }
};
