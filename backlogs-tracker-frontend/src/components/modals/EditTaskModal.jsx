// Hooks
import { useEffect, useState } from "react";
import { useModal } from "providers/ModalProvider";
// Components
import Modal from "components/ui/modal/Modal";
import Input from "components/ui/input/Input";
import ColorSelector from "components/ui/colors-selector/ColorSelector";
import StatusSelector from "components/ui/status-selector/StatusSelector";
import DifficultySelector from "components/ui/difficulty-selector/DifficultySelector";
import DurationSelector from "components/ui/duration-selector/DurationSelector";
// Constants
import { TimeUnits } from "constants/tasks";
// Utils
import { convertDuration, determineTimeUnit } from "utils/tasks";
import { toast } from "react-toastify";
import { useBoardsStore } from "stores/boards/useBoardsStore";
import { updateTaskService } from "services/boards";

const EditTaskModal = ({ boardId, task }) => {
  const { closeModal } = useModal();
  const editTask = useBoardsStore((store) => store.editTask);

  const [title, setTitle] = useState(task.title || "");
  const [description, setDescription] = useState(task.description || "");
  const [status, setStatus] = useState(task.status);
  const [color, setColor] = useState(task.color);
  const [duration, setDuration] = useState("");
  const [timeUnit, setTimeUnit] = useState(
    determineTimeUnit(task.duration) ?? TimeUnits.Minutes
  );
  const [difficulty, setDifficulty] = useState(task.difficulty);

  // Make sure the duration is based on the time unit determined
  useEffect(() => {
    const unit = determineTimeUnit(task.duration);
    if (unit === TimeUnits.Minutes) setDuration(task.duration);
    else if (unit === TimeUnits.Hours) setDuration(task.duration / 60);
    else if (unit === TimeUnits.Days) setDuration(task.duration / (24 * 60));
  }, []);

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

  function handleCancel() {
    closeModal();
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!title) {
      toast.error("Il titolo è obbligatorio");
      return;
    }

    const payload = {
      ...task,
      color,
      title,
      description,
      status,
      duration: convertDuration(duration, timeUnit),
      difficulty,
    };

    const res = await updateTaskService(boardId, payload);
    if (res.ok) {
      editTask(boardId, payload);
      closeModal();
    } else {
      toast.error(res.err || "Impossibile modificare la task.");
    }
  }

  const canSubmit =
    title !== task.title ||
    description !== task.description ||
    status !== task.status ||
    color !== task.color ||
    convertDuration(duration, timeUnit) !== task.duration ||
    difficulty !== task.difficulty;

  return (
    <Modal>
      <form
        onSubmit={handleSubmit}
        className="relative w-full h-full bg-[#f9f5f2] rounded-lg shadow p-6 text-black overflow-y-scroll border-1 border-black"
        style={{ borderColor: color ? color : "" }}
      >
        <h1 className="text-xl font-bold">Modifica task</h1>
        <div className="flex flex-col gap-4 mt-6">
          <ColorSelector selectedColor={color} setSelectedColor={changeColor} />

          <div className="flex flex-col">
            <p className="font-semibold text-lg">Titolo</p>
            <Input
              value={title}
              placeholder="Inserisci titolo"
              className="rounded-lg w-full hover:bg-[#0f0]/30 text-black"
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <p className="font-semibold text-lg">Descrizione</p>
            <textarea
              style={{ height: 60 }}
              value={description}
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
            className="border rounded-lg p-2 hover:bg-[#b57ce8]/70 transition-all"
            disabled={!canSubmit}
            style={!canSubmit ? { pointerEvents: "none", opacity: 0.5 } : {}}
          >
            Applica
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default EditTaskModal;
