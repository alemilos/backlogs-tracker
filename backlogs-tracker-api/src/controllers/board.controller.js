const { status: httpStatus } = require("http-status");
const catchAsync = require("../utils/catchAsync");
const { boardService } = require("../services");

const getBoards = catchAsync(async (req, res) => {
  const userId = req.user.id;
  let boards = await boardService.queryBoards(userId);
  boards.forEach((board) => delete board.userId); // filter the userId field for each entry
  res.status(httpStatus.OK).send({ boards });
});

const addBoard = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const board = await boardService.addBoard(userId, req.body);
  res.status(httpStatus.OK).send({ board });
});

const updateBoard = catchAsync(async (req, res) => {
  const userId = req.user.id;
  await boardService.updateBoard(userId, req.body);
  res.status(httpStatus.OK).send({ message: "Board updated" });
});

const removeBoard = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const boardId = req.query.boardId;
  await boardService.deleteBoard(userId, boardId);
  res.status(httpStatus.OK).send({ message: "Board deleted" });
});

const addTask = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const boardId = req.params.boardId;
  const task = await boardService.addTask(userId, boardId, req.body);
  res.status(httpStatus.OK).send({ task });
});

const updateTask = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const boardId = req.params.boardId;
  await boardService.updateTask(userId, boardId, req.body);
  res.status(httpStatus.OK).send({ message: "Task updated" });
});

const removeTask = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const boardId = req.params.boardId;
  const taskId = req.query.taskId;
  await boardService.deleteTask(userId, boardId, taskId);
  res.status(httpStatus.OK).send({ message: "Task deleted" });
});

module.exports = {
  getBoards,
  addBoard,
  updateBoard,
  removeBoard,
  addTask,
  updateTask,
  removeTask,
};
