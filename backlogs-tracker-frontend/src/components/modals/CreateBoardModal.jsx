// Hooks
import { useModal } from "providers/ModalProvider";
import { useState } from "react";
import { useBoardsStore } from "stores/boards/useBoardsStore";
// Components
import ColorSelector from "components/ui/colors-selector/ColorSelector";
import Input from "components/ui/input/Input";
import Modal from "components/ui/modal/Modal";
// Constants
import { DefaultColor } from "constants/colors";
// Uitls
import { toast } from "react-toastify";
import { Icons } from "utils/icons";
import { addBoardService } from "services/boards";

const CreateBoardModal = () => {
  const { closeModal } = useModal();
  const addBoard = useBoardsStore((store) => store.addBoard);

  const [icon, setIcon] = useState(null);
  const [title, setTitle] = useState("");
  const [color, setColor] = useState(DefaultColor);

  const SelectedIcon = Icons.getIcon(icon);

  function changeColor(_color) {
    if (color === _color) setColor(null);
    else setColor(_color);
  }

  function toggleIcon(_icon) {
    if (icon === _icon) setIcon(null);
    else setIcon(_icon);
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
      icon,
      title,
      color,
    };

    const res = await addBoardService(payload);
    if (res.ok) {
      addBoard({ ...res.data.board });
      closeModal();
    } else {
      toast.error(res.err || "Impossibile creare la board");
    }
  }

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
        <h1 className="text-xl font-bold">Crea una nuova board</h1>
        <div className="flex flex-col gap-4 mt-6">
          <div className="flex flex-col">
            <p className="font-semibold text-lg">Titolo</p>
            <Input
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
          <button className="border rounded-lg p-2 hover:bg-[#0f0]/40 transition-all">
            Crea board
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default CreateBoardModal;
