import { Strategy, ExtractJwt } from 'passport-jwt';
import { config } from './../../config/config.js';

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Es de donde se extrae el token
  secretOrKey: config.jwtSecret, // Obtiene el token
};

const jwtStrategy = new Strategy(options, (payload, done) => {
  // Obtiene el token y lo devuelve en el payload
  return done(null, payload); // Si el token es valido, lo retornamos
});

export default jwtStrategy;
