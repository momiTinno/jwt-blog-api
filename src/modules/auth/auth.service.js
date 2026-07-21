const { randomUUID } = require('node:crypto');

const AUTH_MESSAGES = require('./constant/auth-message.constant');
const authDbService = require('./service/auth-db.service');
const passwordService = require('./service/password.service');
const tokenService = require('./service/token.service');
const authFilterService = require('./service/auth-filter.service');

class AuthService {
  constructor(authDbServiceInstance, passwordServiceInstance, tokenServiceInstance, filterService) {
    this.authDbService = authDbServiceInstance;
    this.passwordService = passwordServiceInstance;
    this.tokenService = tokenServiceInstance;
    this.filterService = filterService;
  }

  async register(data) {
    const hashedPassword = await this.passwordService.hash(data.password);
    const user = await this.authDbService.createUser({
      id: randomUUID(),
      name: data.name,
      email: data.email,
      password: hashedPassword,
    });

    return {
      success: true,
      message: AUTH_MESSAGES.REGISTER_SUCCESS,
      data: this.filterService.toSafeUser(user),
    };
  }

  async login(user) {
    return {
      success: true,
      message: AUTH_MESSAGES.LOGIN_SUCCESS,
      data: {
        user: this.filterService.toSafeUser(user),
        token: this.tokenService.sign(user),
      },
    };
  }

  async getCurrentUser(user) {
    return {
      success: true,
      message: AUTH_MESSAGES.PROFILE_FETCH_SUCCESS,
      data: this.filterService.toSafeUser(user),
    };
  }
}

module.exports = new AuthService(authDbService, passwordService, tokenService, authFilterService);
