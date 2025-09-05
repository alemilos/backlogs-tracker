const Database = require("../config/database");
const logger = require("../config/logger");

const Tasks = {
  async addOne(boardId, data) {
    const pool = Database.getPool();

    try {
      const query = `
        INSERT INTO tasks 
        (boardId, title, description, difficulty, duration, color, status)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `;

      // logger.info(`[Executing Query]: ${query}`);

      const [result] = await pool.query(query, [
        boardId,
        data.title,
        data.description,
        data.difficulty,
        data.duration,
        data.color,
        data.status,
      ]);

      return result.insertId;
    } catch (err) {
      logger.error("[Error in addOne]: ", err);
      throw err;
    }
  },

  async findByIdAndBoard(id, boardId) {
    const pool = Database.getPool();
    try {
      const query = `SELECT * FROM tasks WHERE id = ? AND boardId = ?`;
      // logger.info(`[Executing Query]: ${query}`);

      const [rows] = await pool.query(query, [id, boardId]);
      return rows[0] || null;
    } catch (err) {
      logger.error("[Error in findByIdAndBoard]: ", err);
      throw err;
    }
  },

  async updateOne(boardId, updateBody) {
    try {
      const pool = Database.getPool();
      const { id, title, description, difficulty, duration, color, status } =
        updateBody;

      const query = `
        UPDATE tasks 
        SET title = ?, description = ?, difficulty = ?, duration = ?, color = ?, status = ?
        WHERE id = ? AND boardId = ?
      `;

      const [result] = await pool.query(query, [
        title,
        description,
        difficulty,
        duration,
        color,
        status,
        id,
        boardId,
      ]);

      return result.affectedRows > 0; // true if update happen
    } catch (err) {
      logger.error("[Error in updateOne]: ", err);
      throw err;
    }
  },

  async getAllByBoard(boardId) {
    const pool = Database.getPool();
    try {
      const query = `SELECT * FROM tasks WHERE boardId = ?`;
      // logger.info(`[Executing Query]: ${query}`);

      const [rows] = await pool.query(query, [boardId]);
      return rows;
    } catch (err) {
      logger.error("[Error in getAllByBoard]: ", err);
      throw err;
    }
  },

  async deleteByIdAndBoard(id, boardId) {
    const pool = Database.getPool();
    try {
      const query = `DELETE FROM tasks WHERE id = ? AND boardId = ?`;
      // logger.info(`[Executing Query]: ${query}`);

      const [result] = await pool.query(query, [id, boardId]);
      return result.affectedRows > 0; // true if delete happened
    } catch (err) {
      logger.error("[Error in deleteByIdAndBoard]: ", err);
      throw err;
    }
  },
};

module.exports = Tasks;
