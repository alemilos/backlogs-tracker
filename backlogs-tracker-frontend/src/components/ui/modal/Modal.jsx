import React from "react";

const Modal = ({ width, height, children }) => {
  return (
    <div className="w-[600px] h-[600px]" style={{ width, height }}>
      {children}
    </div>
  );
};

export default Modal;
