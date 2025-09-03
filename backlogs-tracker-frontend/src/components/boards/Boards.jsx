import { useBoardsStore } from "stores/boards/useBoardsStore";
import Board from "./Board";

const Boards = ({ containerRef }) => {
  const boards = useBoardsStore((store) => store.boards);

  return boards.map((board) => (
    <Board key={board.id} board={board} containerRef={containerRef} />
  ));
};

export default Boards;
