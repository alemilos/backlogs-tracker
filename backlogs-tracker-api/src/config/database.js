const mysql = require("mysql2/promise");
require("dotenv").config();

const isLinux = process.platform === "linux";

console.log(process.platform);
const connectionConfig = {
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  multipleStatements: true,
};

// Choose host or socket depending on OS
if (isLinux) {
  connectionConfig.socketPath = "/var/run/mysqld/mysqld.sock"; // default Linux socket
} else {
  connectionConfig.host = process.env.MYSQL_HOST || "127.0.0.1";
}

const Database = {
  pool: null,

  initMySql: async function () {
    // Make sure the database is created
    const connection = await mysql.createConnection(connectionConfig);

    await connection.query(
      `CREATE DATABASE IF NOT EXISTS \`${process.env.MYSQL_DATABASE}\``
    );

    await connection.end();

    this.pool = mysql.createPool({
      ...connectionConfig,
      database: process.env.MYSQL_DATABASE,
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
    userId INT NOT NULL,                      -- the owner of the board 
    title VARCHAR(255) NOT NULL,              -- the board title
    icon VARCHAR(255),                        -- the string id of the icon
    color VARCHAR(255),
    FOREIGN KEY(userId) REFERENCES Users(id) ON DELETE CASCADE 
    )
  `);

    // Create Tasks Table
    await this.pool.query(`
    CREATE TABLE IF NOT EXISTS tasks(
    id INT AUTO_INCREMENT PRIMARY KEY,
    boardId INT NOT NULL,             
    title VARCHAR(255) NOT NULL,                                                   -- the task's title
    description TEXT,                                                              -- the task's description
    difficulty ENUM('easy', 'medium', 'hard') DEFAULT 'easy' NOT NULL,             -- the difficulty level of the task
    duration INT,                                                                  -- estimate in seconds of task duration
    color VARCHAR(255),
    status ENUM('todo', 'doing', 'completed') DEFAULT 'todo' NOT NULL,             -- the 'board' status of the task
    FOREIGN KEY(boardId) REFERENCES Boards(id) ON DELETE CASCADE
    )
  `);
  },

  getPool: function () {
    if (!this.pool) throw new Error("MySql database is not initialized yet");
    return this.pool;
  },
};

module.exports = Database;
