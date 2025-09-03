// Components
import Modal from "components/ui/modal/Modal";
// Hooks
import { useModal } from "providers/ModalProvider";
import { useBoardsStore } from "stores/boards/useBoardsStore";
// Utils
import { toast } from "react-toastify";
// Services
import { deleteBoardService } from "services/boards";

const ConfirmDeleteBoard = ({ boardId }) => {
  const { closeModal } = useModal();
  const removeBoard = useBoardsStore((store) => store.removeBoard);

  async function handleSubmit(e) {
    e.preventDefault();

    const res = await deleteBoardService(boardId);

    if (res.ok) {
      removeBoard(boardId);
      closeModal();
    } else {
      toast.error(res.err || "Impossibile cancellare la board");
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
          Sei sicuro di voler cancellare questa board ?
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

export default ConfirmDeleteBoard;
