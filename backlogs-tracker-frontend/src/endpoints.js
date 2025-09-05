export const Endpoints = {
  login: "/v1/auth/login",
  register: "/v1/auth/register",
  // Boards
  getBoards: "/v1/board",
  addBoard: "/v1/board",
  patchBoard: "/v1/board",
  deleteBoard: "/v1/board",
  // Tasks
  addTask: "/v1/board/", // + requires a :boardId
  patchTask: "/v1/board/", // + requires a :boardId
  deleteTask: "/v1/board/", // + requires a :boardId
  // Search
  search: "/v1/board/search",
};
