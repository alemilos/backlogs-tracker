import { createContext, useContext, useState } from "react";
import ModalOverlay from "components/ui/modal/ModalOverlay";

const ModalContext = createContext();

const ModalProvider = ({ children }) => {
  const [modal, setModal] = useState(null);

  /**
   * *************************************************
   * Private functions
   * *************************************************
   */

  /**
   * Enable scrolling on body element when the modal is closed
   */
  function _hidePageScroll() {
    document.body.classList.add("hide-scrollbar");
  }

  /**
   * Disable scrolling on body element when the modal is open
   */
  function _showPageScroll() {
    document.body.classList.remove("hide-scrollbar");
  }

  /**
   * *************************************************
   * Public functions
   * *************************************************
   */

  /**
   * Open the given ModalComponent
   * @param {*} ModalComponent The JSX modal component to renderer
   * @param {*} props props to pass to the ModalComponent (default: {})
   */
  function openModal(ModalComponent, props = {}) {
    _hidePageScroll();
    setModal({ ModalComponent, props });
  }

  function closeModal() {
    _showPageScroll();
    setModal(null);
  }

  return (
    <ModalContext.Provider value={{ modal, openModal, closeModal }}>
      {children}
      {modal?.ModalComponent && (
        <ModalOverlay onMouseDown={closeModal}>
          <modal.ModalComponent {...modal.props} />
        </ModalOverlay>
      )}
    </ModalContext.Provider>
  );
};

export function useModal() {
  const context = useContext(ModalContext);
  if (!context) throw new Error("useModal must be used within ModalProvider");
  return context;
}

export default ModalProvider;
