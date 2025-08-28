const app = require("./app");
const Database = require("./config/database");
const logger = require("./config/logger");

async function startServer() {
  try {
    await Database.initMySql(); // safe init the db before starting the server

    const server = app.listen(process.env.SERVER_PORT, () => {
      logger.info(`Listening to port ${process.env.SERVER_PORT}`);
    });

    const exitHandler = (origin) => {
      if (server) {
        server.close(() => {
          logger.info(`Server closed from origin: ${origin}`);
          process.exit(1);
        });
      } else {
        process.exit(1);
      }
    };

    const unexpectedErrorHandler = (error) => {
      logger.error(error);
      exitHandler("UNEXPECTED_ERROR");
    };

    process.on("uncaughtException", unexpectedErrorHandler);
    process.on("unhandledRejection", unexpectedErrorHandler);

    process.on("SIGTERM", () => {
      logger.info("SIGTERM received");
      exitHandler("SIGTERM");
    });
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
}

startServer();
