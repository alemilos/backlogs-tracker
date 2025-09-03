import { Endpoints } from "../endpoints";
import { del, get, patch, post } from "../axios";

export async function queryBoards() {
  return await get(Endpoints.getBoards);
}

export async function addBoardService(payload) {
  return await post(Endpoints.addBoard, payload);
}

export async function updateBoardService(payload) {
  return await patch(Endpoints.patchBoard, payload);
}

export async function deleteBoardService(boardId) {
  return await del(Endpoints.deleteBoard, { params: { boardId } });
}

export async function addTaskService(boardId, payload) {
  return await post(Endpoints.addTask + boardId, payload);
}

export async function updateTaskService(boardId, payload) {
  return await patch(Endpoints.patchTask + boardId, payload);
}

export async function deleteTaskService(boardId, taskId) {
  return await del(Endpoints.deleteTask + boardId, { params: { taskId } });
}
