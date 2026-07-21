const pool = require('../../../db/mysql/mysql.connection');
const AUTH_QUERIES = require('../query/auth.query');

class AuthDbService {
  constructor(databasePool) {
    this.pool = databasePool;
  }

  async findUserByEmail(email) {
    const [rows] = await this.pool.execute(AUTH_QUERIES.FIND_USER_BY_EMAIL, [email]);
    return rows[0] || null;
  }

  async findUserById(id) {
    const [rows] = await this.pool.execute(AUTH_QUERIES.FIND_USER_BY_ID, [id]);
    return rows[0] || null;
  }

  async createUser({ id, name, email, password }) {
    await this.pool.execute(AUTH_QUERIES.CREATE_USER, [id, name, email, password]);
    return this.findUserById(id);
  }
}

module.exports = new AuthDbService(pool);
