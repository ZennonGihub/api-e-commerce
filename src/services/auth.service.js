import boom from '@hapi/boom';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import { config } from './../config/config.js';
import { models } from '../libs/sequelize.js';
import { UserService } from './usuarios.service.js';

const UserService = new UserService();

export class AuthService {
  async login(email, password) {
    const auth = await models.Auth.findOne({
      where: { email },
      include: [
        {
          association: 'user',
          include: ['role'],
        },
      ],
    });

    if (!auth) throw boom.unauthorized('Credenciales inválidas');

    const isMatch = await bcrypt.compare(password, auth.password);
    if (!isMatch) throw boom.unauthorized('Credenciales inválidas');

    return auth.user;
  }

  signToken(user) {
    const payload = {
      sub: user.id,
      role: user.role.name,
    };

    const accessToken = jwt.sign(payload, config.jwtSecret, {
      expiresIn: '15m',
    });

    const refreshToken = jwt.sign(payload, config.jwtRefreshToken, {
      expiresIn: '1d',
    });

    return { user, accessToken, refreshToken };
  }

  async sendRecoveryPassword(email) {
    const auth = await models.Auth.findOne({ where: { email } });
    if (!auth) throw boom.unauthorized('Correo no encontrado');

    const payload = { sub: auth.idUser };
    const token = jwt.sign(payload, config.jwtRecovery, { expiresIn: '15m' });

    const link = `http://tu-frontend.com/recovery?token=${token}`;

    await auth.update({ recoveryToken: token });

    const mail = {
      from: config.emailUser,
      to: email,
      subject: 'Recuperar contraseña - E-commerce',
      html: `<b>Ingresa a este link para recuperar tu contraseña: <a href="${link}">${link}</a></b>`,
    };
    const rta = await this.sendMail(mail);
    return rta;
  }

  async changePassword(token, newPassword) {
    try {
      const payload = jwt.verify(token, config.jwtRecovery);
      const auth = await models.Auth.findOne({
        where: { idUser: payload.sub },
      });
      if (!auth || auth.recoveryToken !== token) {
        throw boom.unauthorized('Token inválido o expirado');
      }

      const hash = await bcrypt.hash(newPassword, 10);
      await auth.update({
        password: hash,
        recoveryToken: null,
      });

      return { message: 'Contraseña cambiada exitosamente' };
    } catch (error) {
      throw boom.unauthorized('No estás autorizado');
    }
  }

  async sendMail(infoMail) {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      secure: true,
      port: 465,
      auth: {
        user: config.emailUser,
        pass: config.emailPassword,
      },
    });

    await transporter.sendMail(infoMail);
    return { message: 'Correo enviado' };
  }
}
