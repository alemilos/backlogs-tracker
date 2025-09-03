export function addToken(token) {
  localStorage.setItem("token", JSON.stringify(token));
}

export function getToken() {
  const token = JSON.parse(localStorage.getItem("token"));
  return token?.token || null;
}

export function getTokenObject() {
  const token = JSON.parse(localStorage.getItem("token"));
  return token || null;
}

export function getUser() {
  const user = JSON.parse(localStorage.getItem("user"));
  return user || null;
}

export function clearToken() {
  localStorage.removeItem("token");
}

export function clearUser() {
  localStorage.removeItem("user");
}

/***************************************
 * Board Positions
 */

export function getAllBoardsPosition() {
  const user = getUser();
  if (!user) return;
  return JSON.parse(localStorage.getItem(`positions-${user.username}`)) || {};
}

export function getBoardPosition(boardId) {
  const positions = getAllBoardsPosition();
  const position = positions[boardId];
  return position || { x: null, y: null };
}

export function updateBoardPosition(boardId, position) {
  const user = getUser();
  if (!user) return;

  const positions = getAllBoardsPosition();
  positions[boardId] = position;
  localStorage.setItem(`positions-${user.username}`, JSON.stringify(positions));
}
