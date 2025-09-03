// Hooks
import { useModal } from "providers/ModalProvider";
import { useState } from "react";
import { useBoardsStore } from "stores/boards/useBoardsStore";
// Constants
import { Statuses, Difficulties, TimeUnits } from "constants/tasks";
// Components
import ColorSelector from "components/ui/colors-selector/ColorSelector";
import Input from "components/ui/input/Input";
import Modal from "components/ui/modal/Modal";
import StatusSelector from "components/ui/status-selector/StatusSelector";
import DifficultySelector from "components/ui/difficulty-selector/DifficultySelector";
import DurationSelector from "components/ui/duration-selector/DurationSelector";
// Utils
import { convertDuration } from "utils/tasks";
import { toast } from "react-toastify";
import { addTaskService } from "services/boards";

const CreateTaskModal = ({ board }) => {
  const addTask = useBoardsStore((store) => store.addTask);
  const { closeModal } = useModal();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState(Statuses.Todo);
  const [color, setColor] = useState(null);
  const [duration, setDuration] = useState("");
  const [timeUnit, setTimeUnit] = useState(TimeUnits.Minutes);
  const [difficulty, setDifficulty] = useState(Difficulties.Easy);

  function changeColor(_color) {
    if (color === _color) setColor(null);
    else setColor(_color);
  }

  function changeStatus(_status) {
    setStatus(_status);
  }

  function changeDifficulty(_difficulty) {
    setDifficulty(_difficulty);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!title) {
      toast.error("Il titolo è obbligatorio");
      return;
    }

    const payload = {
      title,
      description,
      color,
      status,
      duration: convertDuration(duration, timeUnit),
      difficulty,
    };

    const res = await addTaskService(board.id, payload);

    if (res.ok) {
      addTask(board.id, res.data.task);
      closeModal();
    } else {
      toast.error(res.err || "Impossibile creare la task.");
    }
  }

  async function handleCancel(e) {
    e.preventDefault();
    closeModal();
  }

  return (
    <Modal>
      <form
        onSubmit={handleSubmit}
        className="relative w-full h-full bg-[#f9f5f2] rounded-lg shadow p-6 text-black overflow-y-scroll border-1 border-black"
        style={{ borderColor: color ? color : "" }}
      >
        <h1 className="text-xl font-bold">Crea una nuova task</h1>
        <p className="opacity-[0.5]">
          Stai creando una nuova task nella board{" "}
          <span className="font-bold">{board.title}</span>
        </p>
        <div className="flex flex-col gap-4 mt-6">
          <ColorSelector selectedColor={color} setSelectedColor={changeColor} />

          <div className="flex flex-col">
            <p className="font-semibold text-lg">Titolo</p>
            <Input
              placeholder="Inserisci titolo"
              className="rounded-lg w-full hover:bg-[#0f0]/30 text-black"
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <p className="font-semibold text-lg">Descrizione</p>
            <textarea
              style={{ height: 60 }}
              className="w-full outline-none border rounded-lg p-2 hover:bg-[#DB0001]/30 resize-none"
              placeholder="Inserisci descrizione"
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <StatusSelector status={status} changeStatus={changeStatus} />

          <DurationSelector
            duration={duration}
            setDuration={setDuration}
            timeUnit={timeUnit}
            setTimeUnit={setTimeUnit}
          />

          <DifficultySelector
            difficulty={difficulty}
            changeDifficulty={changeDifficulty}
          />
        </div>

        <div className="flex gap-2 absolute bottom-6 right-6">
          <button
            onClick={handleCancel}
            className="border rounded-lg p-2 hover:bg-[gray]/20 transition-all"
          >
            Annulla
          </button>
          <button
            onClick={handleSubmit}
            className="border rounded-lg p-2 hover:bg-[#0f0]/40 transition-all"
          >
            Crea task
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default CreateTaskModal;
