import { queryBoards } from "services/boards";
import { create } from "zustand";

export const useBoardsStore = create((set, get) => {
  async function fetchBoards() {
    const res = await queryBoards();
    if (res.ok) {
      set({ boards: res.data.boards || [] });
    }
  }

  function addBoard(board) {
    board.tasks = [];
    set((prev) => ({ boards: [...prev.boards, board] }));
  }

  function removeBoard(boardId) {
    set((prev) => ({
      boards: prev.boards.filter((board) => board.id !== boardId),
    }));
  }

  function editBoard(board) {
    set((prev) => ({
      boards: prev.boards.map((b) => {
        if (b.id !== board.id) return b;
        return { ...b, ...board };
      }),
    }));
  }

  function addTask(boardId, task) {
    console.log({ boardId, task });
    set((prev) => ({
      boards: prev.boards.map((board) => {
        if (board.id !== boardId) return board;
        return { ...board, tasks: [...board.tasks, task] };
      }),
    }));
  }

  function removeTask(boardId, taskId) {
    set((prev) => ({
      boards: prev.boards.map((board) => {
        if (board.id !== boardId) return board;
        return {
          ...board,
          tasks: board.tasks.filter((task) => task.id !== taskId),
        };
      }),
    }));
  }

  function editTask(boardId, task) {
    set((prev) => ({
      boards: prev.boards.map((board) => {
        if (board.id !== boardId) return board;
        return {
          ...board,
          tasks: board.tasks.map((t) => {
            if (t.id !== task.id) return t;
            return {
              ...t,
              ...task,
            };
          }),
        };
      }),
    }));
  }

  return {
    boards: [],
    fetchBoards,
    addBoard,
    removeBoard,
    editBoard,
    addTask,
    removeTask,
    editTask,
  };
});
