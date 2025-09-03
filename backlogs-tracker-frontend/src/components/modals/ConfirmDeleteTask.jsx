import Modal from "components/ui/modal/Modal";
import { useModal } from "providers/ModalProvider";
import { toast } from "react-toastify";
import { deleteTaskService } from "services/boards";
import { useBoardsStore } from "stores/boards/useBoardsStore";

const ConfirmDeleteTask = ({ boardId, taskId }) => {
  const removeTask = useBoardsStore((store) => store.removeTask);
  const { closeModal } = useModal();

  async function handleSubmit(e) {
    e.preventDefault();

    const res = await deleteTaskService(boardId, taskId);

    if (res.ok) {
      removeTask(boardId, taskId);
      closeModal();
    } else {
      toast.error(res.err || "Impossibile cancellare la task.");
    }
  }

  function handleCancel() {
    closeModal();
  }

  return (
    <Modal height={140} width={500}>
      <form
        onSubmit={handleSubmit}
        className="relative w-full h-full bg-[#f9f5f2] rounded-lg shadow p-6 text-black overflow-y-scroll border-1 border-black"
      >
        <h1 className="text-xl font-bold">
          Sei sicuro di voler cancellare questa task ?
        </h1>

        <div className="flex gap-2 absolute bottom-6 right-6">
          <button
            onClick={handleCancel}
            className="border rounded-lg p-2 hover:bg-[#0f0]/40 transition-all"
          >
            Annulla
          </button>
          <button className="border rounded-lg p-2 hover:bg-[#f00]/60 transition-all">
            Conferma
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default ConfirmDeleteTask;
