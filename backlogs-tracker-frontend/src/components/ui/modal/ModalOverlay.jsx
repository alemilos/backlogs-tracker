const ModalOverlay = ({ children, onMouseDown }) => {
  return (
    <div
      className="fixed top-0 left-0 w-full h-full flex items-center bg-[#000]/[0.2] backdrop-blur-sm justify-center z-[100] cursor-pointer" // z-20 is higher than navbar
      onMouseDown={onMouseDown}
    >
      <div onMouseDown={(e) => e.stopPropagation()} className="cursor-default">
        {children}
      </div>
    </div>
  );
};

export default ModalOverlay;
