import ConfirmDeleteTask from "components/modals/ConfirmDeleteTask";
import EditTaskModal from "components/modals/EditTaskModal";
import { useModal } from "providers/ModalProvider";
import { FiEdit2 } from "react-icons/fi";
import { IoRemoveCircleOutline } from "react-icons/io5";
import { hexToRgba } from "utils/colors";
import { shortenText } from "utils/text";

const Task = ({ boardId, task }) => {
  const { openModal } = useModal();

  function handleEditTask() {
    openModal(EditTaskModal, { boardId, task });
  }

  function handleDeleteTask() {
    openModal(ConfirmDeleteTask, { boardId, taskId: task.id });
  }

  return (
    <div
      key={task.id}
      className=" w-full p-2 rounded-lg flex items-center justify-between border border-black cursor-pointer"
      style={{ backgroundColor: hexToRgba(task.color, 0.8) }}
    >
      <p className="text-black">{shortenText(task.title, 34)}</p>
      <div className="flex gap-2 items-center justify-center">
        <FiEdit2
          onClick={handleEditTask}
          className="text-black/60 hover:text-black/30 transition-all"
        />
        <IoRemoveCircleOutline
          onClick={handleDeleteTask}
          className="text-xl text-[#421F17] hover:text-[#8e1600] transition-all"
        />
      </div>
    </div>
  );
};

export default Task;
