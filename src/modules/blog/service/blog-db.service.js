const pool = require('../../../db/mysql/mysql.connection');
const BLOG_QUERIES = require('../query/blog.query');

class BlogDbService {
  constructor(databasePool) {
    this.pool = databasePool;
  }

  async create({ title, content, userId }) {
    const [result] = await this.pool.execute(BLOG_QUERIES.CREATE, [title, content, userId]);

    return this.findById(result.insertId);
  }

  async findAll() {
    const [rows] = await this.pool.execute(BLOG_QUERIES.FIND_ALL);
    return rows;
  }

  async findById(id) {
    const [rows] = await this.pool.execute(BLOG_QUERIES.FIND_BY_ID, [id]);
    return rows[0] || null;
  }

  async updateById(id, { title, content }) {
    await this.pool.execute(BLOG_QUERIES.UPDATE_BY_ID, [title, content, id]);
    return this.findById(id);
  }

  async deleteById(id) {
    await this.pool.execute(BLOG_QUERIES.DELETE_BY_ID, [id]);
  }
}

module.exports = new BlogDbService(pool);
