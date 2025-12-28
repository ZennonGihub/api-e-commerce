import boom from '@hapi/boom';
import { AuthService } from '../services/auth.service.js';

const service = new AuthService();

export const getToken = async (req, res, next) => {
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
};

export const refreshToken = async (req, res, next) => {
  try {
    const refreshToken = req.cookies.jwt;
    if (!refreshToken) {
      throw boom.forbidden(`No tienes un token de refresh`);
    }
    const payload = jwt.verify(refreshToken, config.jwtRefreshToken);
    const user = await service.findOne(payload.sub);
    if (!user) {
      throw boom.forbidden(`Usuario invalido`);
    }
    const newPayload = {
      sub: user.id,
      role: user.role,
    };
    const accestoken = jwt.sign(newPayload, config.jwtSecret, {
      expiresIn: '15m',
    });
    return res.json(accestoken);
  } catch (error) {
    next(error);
  }
};

export const recoveryToken = async (req, res, next) => {
  try {
    const { email } = req.body;
    const rta = await service.sendRecoveryPassword(email);
    res.json(rta);
  } catch (error) {}
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
