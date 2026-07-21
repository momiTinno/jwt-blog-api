const HTTP_STATUS = require('../../constant/http-status.constant');
const authService = require('./auth.service');

class AuthController {
  constructor(authServiceInstance) {
    this.authService = authServiceInstance;
    this.register = this.register.bind(this);
    this.login = this.login.bind(this);
    this.me = this.me.bind(this);
  }

  async register(req, res) {
    const result = await this.authService.register(req.validatedBody);
    return res.status(HTTP_STATUS.CREATED).json(result);
  }

  async login(req, res) {
    const result = await this.authService.login(req.authenticatedUser);
    return res.status(HTTP_STATUS.OK).json(result);
  }

  async me(req, res) {
    const result = await this.authService.getCurrentUser(req.currentUser);
    return res.status(HTTP_STATUS.OK).json(result);
  }
}

module.exports = new AuthController(authService);
