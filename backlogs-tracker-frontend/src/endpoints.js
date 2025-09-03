export const Endpoints = {
  login: "/v1/auth/login",
  register: "/v1/auth/register",
  getBoards: "/v1/board",
  addBoard: "/v1/board",
  patchBoard: "/v1/board",
  deleteBoard: "/v1/board",
  addTask: "/v1/board/", // + requires a :boardId
  patchTask: "/v1/board/", // + requires a :boardId
  deleteTask: "/v1/board/", // + requires a :boardId
};
