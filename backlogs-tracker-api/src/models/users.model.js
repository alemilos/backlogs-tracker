const Database = require("../config/database");
const logger = require("../config/logger");

const Users = {
  /**
   * Safe
   * @param {*} username
   * @param {*} email
   * @param {*} password
   * @param {*} role
   * @returns
   */
  async addOne(username, email, password, role) {
    try {
      const pool = Database.getPool();

      const query = `
        INSERT INTO users
        (username, email, password, role) 
        VALUES (?, ? , ?, ?)
        `;
      logger.info(`[Executing Query]: ${query}`);

      const [result] = await pool.query(query, [
        username,
        email,
        password,
        role,
      ]);

      return result.insertId;
    } catch (err) {
      logger.error("[Error in addOne]: ", err);
      throw err;
    }
  },

  /**
   * Safe
   * @param {*} userId
   */
  async deleteOne(userId) {
    try {
      const query = `
      DELETE FROM users
      WHERE id = ?  
      `;

      logger.info(`[Executing Query]: ${query}`);
      const res = await pool.query(query, [userId]);
      console.log(res);

      return res;
    } catch (err) {
      logger.error("[Error in deleteOne]: ", err);
      throw err;
    }
  },

  /**
   * Vulnerable
   * @param {*} username
   * @param {*} password
   */
  async selectOneByUsernamePassword(username, password) {
    try {
      const pool = Database.getPool();

      const query = `
        SELECT * FROM users 
        WHERE username = '${username}' AND password = '${password}'
      `;

      logger.info(`[Executing Query]: ${query}`);
      const results = await pool.query(query);
      return results;
    } catch (err) {
      logger.error("[Error in selectOneByUsernamePassword]: ", err);
      throw err;
    }
  },
};

module.exports = Users;
