const Database = require("../config/database");
const logger = require("../config/logger");

const Boards = {
  async addOne(userId, data) {
    const pool = Database.getPool();

    try {
      const query = `
        INSERT INTO boards
        (userId, title, icon, color)
        VALUES (?, ?, ?, ?)
      `;

      // logger.info(`[Executing Query]: ${query}`);

      const [result] = await pool.query(query, [
        userId,
        data.title,
        data.icon,
        data.color,
      ]);

      return result.insertId;
    } catch (err) {
      logger.error("[Error in addOne]: ", err);
      throw err;
    }
  },

  async findByIdAndUser(id, userId) {
    const pool = Database.getPool();
    try {
      const query = `SELECT * FROM boards WHERE id = ? AND userId = ?`;
      // logger.info(`[Executing Query]: ${query}`);

      const [rows] = await pool.query(query, [id, userId]);
      return rows[0] || null;
    } catch (err) {
      logger.error("[Error in findByIdAndUser]: ", err);
      throw err;
    }
  },

  async updateOne(userId, updateBody) {
    try {
      const pool = Database.getPool();
      const { id, title, icon, color } = updateBody;

      const query = `
        UPDATE boards
        SET title = ?, icon = ?, color = ?
        WHERE id = ? AND userId = ?
      `;

      const [result] = await pool.query(query, [
        title,
        icon,
        color,
        id,
        userId,
      ]);

      return result.affectedRows > 0; // true if update happen
    } catch (err) {
      logger.error("[Error in updateOne]: ", err);
      throw err;
    }
  },

  async getAllByUser(userId) {
    const pool = Database.getPool();
    try {
      const query = `SELECT * FROM boards WHERE userId = ?`;
      // logger.info(`[Executing Query]: ${query}`);

      const [rows] = await pool.query(query, [userId]);

      return rows;
    } catch (err) {
      logger.error("[Error in getAllByUser]: ", err);
      throw err;
    }
  },

  /**
   * Vulneable
   * @param {*} userId
   * @param {*} title
   * @returns
   */
  async getByTitle(userId, title) {
    const pool = Database.getPool();
    try {
      let query;
      if (title === "*") {
        query = `
        SELECT * FROM boards
        WHERE userId = ${userId}
        `;
      } else {
        query = `
        SELECT * FROM boards
        WHERE userId = ${userId} AND title = '${title}'
        `;
        // AND (title = '${title}' OR title LIKE '%${title}%')
      }

      logger.info(`[Executing Query]: ${query}`);

      const [rows] = await pool.query(query);

      return rows;
    } catch (err) {
      logger.error("[Error in getByTitle]: ", err);
      throw err;
    }
  },

  async deleteByIdAndUser(id, userId) {
    const pool = Database.getPool();
    try {
      const query = `DELETE FROM boards WHERE id = ? AND userId = ?`;
      // logger.info(`[Executing Query]: ${query}`);

      const [result] = await pool.query(query, [id, userId]);
      return result.affectedRows > 0; // true if delete happened
    } catch (err) {
      logger.error("[Error in deleteByIdAndUser]: ", err);
      throw err;
    }
  },
};

module.exports = Boards;
