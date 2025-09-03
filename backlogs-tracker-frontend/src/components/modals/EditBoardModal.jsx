// Hooks
import { useState } from "react";
import { useModal } from "providers/ModalProvider";
// Components
import ColorSelector from "components/ui/colors-selector/ColorSelector";
import Input from "components/ui/input/Input";
import Modal from "components/ui/modal/Modal";
import ConfirmDeleteBoard from "components/modals/ConfirmDeleteBoard";
// Utils
import { Icons } from "utils/icons";
import { useBoardsStore } from "stores/boards/useBoardsStore";
import { updateBoardService } from "services/boards";
import { toast } from "react-toastify";

const EditBoardModal = ({ board }) => {
  const { openModal, closeModal } = useModal();
  const editBoard = useBoardsStore((store) => store.editBoard);

  const [icon, setIcon] = useState(board.icon);
  const [title, setTitle] = useState(board.title);
  const [color, setColor] = useState(board.color);

  const SelectedIcon = Icons.getIcon(icon);

  function changeColor(_color) {
    if (color === _color) setColor(null);
    else setColor(_color);
  }

  function toggleIcon(_icon) {
    if (icon === _icon) setIcon(null);
    else setIcon(_icon);
  }

  function handleDeleteBoard() {
    openModal(ConfirmDeleteBoard, { boardId: board.id });
  }

  function handleCancel() {
    closeModal();
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const payload = {
      ...board,
      icon,
      title,
      color,
    };
    if (!title) {
      toast.error("Il titolo è obbligatorio.");
      return;
    }

    const res = await updateBoardService(payload);
    if (res.ok) {
      editBoard({ ...payload });
      closeModal();
    } else {
      toast.error(res.err || "Impossibile modificare la board.");
    }
  }

  const canSubmit =
    icon !== board.icon || title !== board.title || color !== board.color;

  return (
    <Modal height={400}>
      <form
        onSubmit={handleSubmit}
        className="relative w-full h-full bg-[#f9f5f2] rounded-lg shadow p-6 text-black overflow-y-scroll border-1 border-black"
        style={{ borderColor: color ? color : "" }}
      >
        {SelectedIcon && (
          <div
            className="absolute right-[30px]"
            onClick={() => toggleIcon(null)}
          >
            <SelectedIcon className="cursor-pointer text-3xl hover:text-[#f00]/60" />
          </div>
        )}
        <h1 className="text-xl font-bold">Modifica board</h1>
        <div className="flex flex-col gap-4 mt-6">
          <div className="flex flex-col">
            <p className="font-semibold text-lg">Titolo</p>
            <Input
              value={title}
              placeholder="Inserisci titolo"
              className="rounded-lg w-full hover:bg-[#0f0]/30 text-black"
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="flex flex-col ">
            <p className="font-semibold text-lg">Icona</p>
            <div className="flex flex-col gap-3">
              <div className="flex gap-2 overflow-x-scroll h-12 outline-none">
                {Icons.getIcons().map((_icon) => {
                  const Icon = _icon.icon;
                  const match = icon === _icon.name;
                  return (
                    <div
                      key={_icon.name}
                      className="w-8 h-8 hover:bg-[#000]/30 p-1 bg-[#000]/5 rounded-full flex items-center justify-center outline-none"
                      style={{ backgroundColor: match ? "black" : "" }}
                      onClick={() => toggleIcon(_icon.name)}
                    >
                      {Icon && (
                        <Icon
                          className="text-2xl cursor-pointer text-[#000]/20 hover:text-[#000] transition-all"
                          style={{ color: match ? "#fff" : "" }}
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <ColorSelector
            title="Colore board"
            selectedColor={color}
            setSelectedColor={changeColor}
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
            disabled={!canSubmit}
            style={!canSubmit ? { pointerEvents: "none", opacity: 0.5 } : {}}
            className="border rounded-lg p-2 hover:bg-[#b57ce8]/70 transition-all"
          >
            Applica
          </button>
        </div>

        <button
          onClick={handleDeleteBoard}
          className="absolute border rounded-lg p-2 bg-[#f00]/50 hover:bg-[#f00]/70 transition-all bottom-6 left-6 transition-all"
        >
          Cancella Board
        </button>
      </form>
    </Modal>
  );
};

export default EditBoardModal;
