const bcrypt = require('bcryptjs');

const AUTH_CONSTANTS = require('../constant/auth.constant');

class PasswordService {
  async hash(password) {
    return bcrypt.hash(password, AUTH_CONSTANTS.SALT_ROUNDS);
  }

  async compare(plainPassword, hashedPassword) {
    return bcrypt.compare(plainPassword, hashedPassword);
  }
}

module.exports = new PasswordService();
