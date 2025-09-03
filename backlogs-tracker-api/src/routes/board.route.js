const express = require("express");
const router = express.Router();
const { boardController } = require("../controllers");
const auth = require("../middlewares/auth");
const validate = require("../middlewares/validate");
const { boardValidation } = require("../validations");

router
  .route("/")
  .get(auth(), boardController.getBoards)
  .post(auth(), validate(boardValidation.addBoard), boardController.addBoard)
  .patch(
    auth(),
    validate(boardValidation.updateBoard),
    boardController.updateBoard
  )
  .delete(
    auth(),
    validate(boardValidation.removeBoard),
    boardController.removeBoard
  );

router
  .route("/:boardId")
  .post(auth(), validate(boardValidation.addTask), boardController.addTask)
  .patch(
    auth(),
    validate(boardValidation.updateTask),
    boardController.updateTask
  )
  .delete(
    auth(),
    validate(boardValidation.removeTask),
    boardController.removeTask
  );

module.exports = router;
