const { status: httpStatus } = require("http-status");
const { Board, Task } = require("../models");
const ApiError = require("../utils/ApiError");
const logger = require("../config/logger");

async function queryBoards(userId) {
  const boards = await Board.getAllByUser(userId);
  for (let board of boards) {
    board.tasks = await Task.getAllByBoard(board.id);
  }
  return boards;
}

async function updateBoard(userId, updateBody) {
  const updatedBoard = await Board.updateOne(userId, updateBody);
  if (!updatedBoard)
    throw new ApiError(httpStatus.NOT_FOUND, "Board not updated");
}

async function addBoard(userId, data) {
  const boardId = await Board.addOne(userId, data);
  const board = await Board.findByIdAndUser(boardId, userId);
  return board;
}

async function deleteBoard(userId, boardId) {
  const deletedBoard = await Board.deleteByIdAndUser(boardId, userId);
  if (!deletedBoard)
    throw new ApiError(httpStatus.NOT_FOUND, "Board not deleted");
}

async function addTask(userId, boardId, data) {
  const board = await Board.findByIdAndUser(boardId, userId);
  if (!board) throw new ApiError(httpStatus.NOT_FOUND, "Board not found");

  const taskId = await Task.addOne(boardId, data);
  if (!taskId)
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, "Can't create task");

  const task = await Task.findByIdAndBoard(taskId, boardId);

  return task;
}

async function updateTask(userId, boardId, updateBody) {
  const board = await Board.findByIdAndUser(boardId, userId);
  if (!board) throw new ApiError(httpStatus.NOT_FOUND, "Board not found");

  const updatedTask = await Task.updateOne(boardId, updateBody);
  if (!updatedTask)
    throw new ApiError(httpStatus.NOT_FOUND, "Task not updated");
}

async function deleteTask(userId, boardId, taskId) {
  const board = await Board.findByIdAndUser(boardId, userId);
  if (!board) throw new ApiError(httpStatus.NOT_FOUND, "Board not found");

  const deletedTask = await Task.deleteByIdAndBoard(taskId, boardId);
  if (!deletedTask)
    throw new ApiError(httpStatus.NOT_FOUND, "Task not deleted");
}

async function querySearch(userId, query) {
  logger.info(`[User Search Query]:  ${query}`);
  // search in tasks and search in boards
  const results = await Board.getByTitle(userId, query);
  // maybe add tasks here ?
  return results;
}

module.exports = {
  queryBoards,
  addBoard,
  updateBoard,
  deleteBoard,
  addTask,
  updateTask,
  deleteTask,
  querySearch,
};
