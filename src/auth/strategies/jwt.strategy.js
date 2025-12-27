const { Strategy, ExtractJwt } = require('passport-jwt');
const { config } = require('../../../config/config');

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Es de donde se extrae el token
  secretOrKey: config.jwtSecret, // Obtiene el token
};

const jwtStrategy = new Strategy(options, (payload, done) => {
  // Obtiene el token y lo devuelve en el payload
  return done(null, payload); // Si el token es valido, lo retornamos
});

module.exports = jwtStrategy;
