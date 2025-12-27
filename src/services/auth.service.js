import { UserServices } from './usuarios.service.js';
import boom from '@hapi/boom';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { config } from './../config/config.js';
import nodemailer from 'nodemailer';

const service = new UserServices();

export class AuthService {
  async getUser(email, password) {
    const user = await service.findByEmail(email);
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw boom.unauthorized('Contraña incorrecta');
    }
    delete user.dataValues.password;
    return user;
  }

  async generateToken(user) {
    const payload = {
      sub: user.id,
      role: user.role,
    };
    const accessToken = jwt.sign(payload, config.jwtSecret, {
      expiresIn: '15m',
    });

    const refreshToken = jwt.sign(payload, config.jwtRefreshToken, {
      expiresIn: '1d',
    });
    return { accessToken, refreshToken };
  }

  async sendRecoveryPassword(email) {
    const user = await service.findByEmail(email);
    const payload = { sub };
    const recoveryTokenPassword = jwt.sign(payload, config.jwtRecovery, {
      expiresIn: '15m',
    });
    const link = `http://frontend.com/recovery?token=${recoveryTokenPassword}`;
    await service.update(user.id, { recoveryToken: recoveryTokenPassword });
    const mail = {
      from: config.emailUser,
      to: `${user.email}`,
      subject: 'Email para recuperar contraseña',
      text: `<b>Ingresa a este link para recuperar tu contraseña => ${link}</b>`,
    };
    const rta = await this.sendMail(mail);
    return rta;
  }

  async changePassword(token, newPassword) {
    try {
      const payload = jwt.verify(token, config.jwtRecovery);
      const user = await service.findOne(payload.sub);
      if (user.recoveryToken !== token) {
        throw boom.unauthorized(`No estas autorizado`);
      }
      const hash = await bcrypt.hash(newPassword, 10);
      await service.update(user.id, { recoveryToken: null, password: hash });
      return { message: 'La contraseña fue cambiada con exito' };
    } catch (error) {
      throw boom.unauthorized(`No estas autorizado`);
    }
  }

  async sendMail(infoMail) {
    let transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      secure: true,
      port: 465,
      auth: {
        user: config.emailUser,
        pass: config.emailPassword,
      },
    });
    await transporter.sendMail(infoMail);
    return { message: 'Mail sent' };
  }
}
