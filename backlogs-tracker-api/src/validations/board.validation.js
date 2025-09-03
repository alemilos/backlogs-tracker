const Joi = require("joi");

const addBoard = Joi.object({
  title: Joi.string().required(),
  icon: Joi.string().required(),
  color: Joi.string().required(),
});

const updateBoard = Joi.object({
  id: Joi.number().integer().required(), // the board id
  title: Joi.string(),
  icon: Joi.string(),
  color: Joi.string(),
}).min(2); // Require at least one field to update

const removeBoard = Joi.object({
  query: {
    boardId: Joi.number().integer().required(),
  },
});

const addTask = Joi.object({
  params: {
    boardId: Joi.number().integer().required(),
  },

  title: Joi.string().required(),
  description: Joi.string().required(),
  color: Joi.string().required(),
  difficulty: Joi.string().valid("easy", "medium", "hard").default("low"),
  duration_est: Joi.number().integer().required(),
  status: Joi.string().valid("todo", "doing", "completed").default("todo"),
});

const updateTask = Joi.object({
  params: {
    boardId: Joi.number().integer().required(),
  },

  id: Joi.number().integer().required(), // the task id
  title: Joi.string(),
  description: Joi.string(),
  color: Joi.string(),
  difficulty: Joi.string().valid("easy", "medium", "hard"),
  duration_est: Joi.number().integer(),
  status: Joi.string().valid("todo", "doing", "completed"),
}).min(2); // Require at least one field to update + task id field

const removeTask = Joi.object({
  query: {
    taskId: Joi.number().integer().required(),
  },
});

module.exports = {
  addBoard,
  updateBoard,
  removeBoard,
  addTask,
  updateTask,
  removeTask,
};
