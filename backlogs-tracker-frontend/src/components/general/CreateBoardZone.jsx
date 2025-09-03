import CreateBoardModal from "components/modals/CreateBoardModal";
import { useModal } from "providers/ModalProvider";
import { BsPlusLg } from "react-icons/bs";

const CreateBoardZone = () => {
  const { openModal } = useModal();

  function handleOpenCreateBoard() {
    openModal(CreateBoardModal);
  }

  return (
    <div
      onClick={handleOpenCreateBoard}
      className="absolute border border-black rounded-full h-20 w-20 hover:bg-[#b57ce8]/20 cursor-pointer top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%] transition-all flex items-center justify-center z-10 bg-white"
    >
      <BsPlusLg className="text-2xl text-black" />
    </div>
  );
};

export default CreateBoardZone;
