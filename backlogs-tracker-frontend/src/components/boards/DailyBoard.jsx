import CreateTaskModal from "components/modals/CreateTaskModal";
import ConfirmDeleteTask from "components/modals/ConfirmDeleteTask";

import { GiNotebook } from "react-icons/gi";
import { BsPlusLg } from "react-icons/bs";
import { useModal } from "providers/ModalProvider";
import { IoRemoveCircleOutline } from "react-icons/io5";

const DailyBoard = ({}) => {
  const { openModal } = useModal();
  const tasks = [];
  const board = { title: "Giornaliere" };

  function handleAddTask() {
    openModal(CreateTaskModal, { board });
  }

  function handleDeleteTask() {
    openModal(ConfirmDeleteTask);
  }

  return (
    <div className="bg-[#421F17]/75 rounded-lg w-[300px] min-h-8 h-70 h-[700px] p-4 flex flex-col gap-3 shadow absolute top-28 right-4">
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <GiNotebook className="text-[#BB9376] text-xl" />
          <p className="text-[#BB9376] font-semibold">Giornaliere</p>
        </div>

        <div className="">
          <button
            onClick={handleAddTask}
            className="cursor-pointer border border-[#BB9376] w-6 h-6 rounded-full flex items-center justify-center hover:bg-[#BB9376]/30 transition-all"
          >
            <BsPlusLg className="text-[#BB9376]" />
          </button>
        </div>
      </div>

      <div className="overflow-y-scroll max-h-64 flex flex-col gap-2">
        {tasks.map((task) => {
          return (
            <div
              key={task.id}
              className="bg-[#BB9376]/90 w-full p-2 rounded-lg flex items-center justify-between"
            >
              <p className="text-black">{task.title}</p>
              <IoRemoveCircleOutline
                onClick={handleDeleteTask}
                className="text-xl text-[#421F17] hover:text-[#8e1600] transition-all"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DailyBoard;
