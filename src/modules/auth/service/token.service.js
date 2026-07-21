const jwt = require('jsonwebtoken');

const envConfig = require('../../../config/env.config');

class TokenService {
  sign(user) {
    return jwt.sign(
      {
        userId: user.id,
        email: user.email,
      },
      envConfig.jwt.secret,
      {
        expiresIn: envConfig.jwt.expiresIn,
      }
    );
  }

  verify(token) {
    return jwt.verify(token, envConfig.jwt.secret);
  }
}

module.exports = new TokenService();
