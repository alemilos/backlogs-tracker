const mysql = require("mysql2/promise");
require("dotenv").config();

const connectionConfig = {
  host:
    process.platform === "darwin"
      ? "127.0.0.1"
      : process.env.MYSQL_HOST || "127.0.0.1",
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  multipleStatements: true,
};

const Database = {
  pool: null,

  // Helper function to wait with exponential backoff
  async waitForConnection(maxRetries = 10, initialDelay = 1000) {
    let retries = 0;
    let delay = initialDelay;

    while (retries < maxRetries) {
      try {
        console.log(
          `Attempting to connect to MySQL... (attempt ${
            retries + 1
          }/${maxRetries})`
        );
        const connection = await mysql.createConnection(connectionConfig);
        await connection.ping();
        await connection.end();
        console.log("Successfully connected to MySQL!");
        return true;
      } catch (error) {
        retries++;
        if (retries >= maxRetries) {
          throw new Error(
            `Failed to connect to MySQL after ${maxRetries} attempts: ${error.message}`
          );
        }
        console.log(`Connection failed, retrying in ${delay}ms...`);
        await new Promise((resolve) => setTimeout(resolve, delay));
        delay = Math.min(delay * 2, 10000); // Exponential backoff, max 10 seconds
      }
    }
  },

  initMySql: async function () {
    // Wait for MySQL to be ready
    await this.waitForConnection();

    // Make sure the database is created
    const connection = await mysql.createConnection(connectionConfig);
    await connection.query(
      `CREATE DATABASE IF NOT EXISTS \`${process.env.MYSQL_DATABASE}\``
    );
    await connection.end();

    this.pool = mysql.createPool({
      ...connectionConfig,
      database: process.env.MYSQL_DATABASE,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });

    // Create User Table
    await this.pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(20) NOT NULL UNIQUE,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(30) NOT NULL,
        role ENUM('user', 'admin') DEFAULT 'user',
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create Boards Table
    await this.pool.query(`
      CREATE TABLE IF NOT EXISTS boards (
        id INT AUTO_INCREMENT PRIMARY KEY,
        userId INT NOT NULL,
        title VARCHAR(255) NOT NULL,
        icon VARCHAR(255),
        color VARCHAR(255),
        FOREIGN KEY(userId) REFERENCES users(id) ON DELETE CASCADE 
      )
    `);

    // Create Tasks Table
    await this.pool.query(`
      CREATE TABLE IF NOT EXISTS tasks(
        id INT AUTO_INCREMENT PRIMARY KEY,
        boardId INT NOT NULL,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        difficulty ENUM('easy', 'medium', 'hard') DEFAULT 'easy' NOT NULL,
        duration INT,
        color VARCHAR(255),
        status ENUM('todo', 'doing', 'completed') DEFAULT 'todo' NOT NULL,
        FOREIGN KEY(boardId) REFERENCES boards(id) ON DELETE CASCADE
      )
    `);

    console.log("Database initialized successfully!");
  },

  getPool: function () {
    if (!this.pool) throw new Error("MySql database is not initialized yet");
    return this.pool;
  },
};

module.exports = Database;
