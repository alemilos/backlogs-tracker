// Hooks
import { useModal } from "providers/ModalProvider";
// Components
import Draggable from "components/ui/draggable/Draggable";
import CreateTaskModal from "components/modals/CreateTaskModal";
import Task from "components/tasks/Task";
import EditBoardModal from "components/modals/EditBoardModal";
// Utils
import { shortenText } from "utils/text";
import { Icons } from "utils/icons";
import { hexToRgba } from "utils/colors";
// Icons
import { BsPlusLg } from "react-icons/bs";
import { FiEdit2 } from "react-icons/fi";

const Board = ({ containerRef, board }) => {
  const { openModal } = useModal();

  const Icon = Icons.getIcon(board.icon);

  function handleEditTask() {
    openModal(EditBoardModal, { board });
  }

  function handleAddTask() {
    openModal(CreateTaskModal, { board });
  }

  return (
    <Draggable containerRef={containerRef} id={board.id}>
      <div
        className={`rounded-lg w-[300px] min-h-8 h-70 p-4 flex flex-col gap-3 shadow text-black border border-black`}
        style={{ backgroundColor: hexToRgba(board.color, 0.75) }}
      >
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            {Icon && <Icon className="text-xl" />}
            <p className=" font-semibold">
              {shortenText(board.title, Icon ? 23 : 30)}
            </p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleEditTask}
              className="cursor-pointer border border-black w-6 h-6 rounded-full flex items-center justify-center hover:bg-black/30 transition-all"
            >
              <FiEdit2 className="text-black/60 text-sm" />
            </button>
            <button
              onClick={handleAddTask}
              className="cursor-pointer border border-black w-6 h-6 rounded-full flex items-center justify-center hover:bg-black/30 transition-all"
            >
              <BsPlusLg />
            </button>
          </div>
        </div>

        <div className="overflow-y-scroll max-h-64 flex flex-col gap-2">
          {board.tasks &&
            board.tasks.map((task) => (
              <Task key={task.id} boardId={board.id} task={task} />
            ))}
        </div>
      </div>
    </Draggable>
  );
};

export default Board;
