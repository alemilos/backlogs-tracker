import React, { useState } from "react";

function getOpacity(enabled, hover) {
  if (enabled) return 0.8;
  if (hover) return 0.5;
  return 0.2;
}

const Tag = ({ color, bg, text, onClick, enabled = false }) => {
  const [hover, setHover] = useState(false);
  return (
    <div
      className={`py-1.5 px-3 rounded-lg max-w-fit text-white cursor-pointer select-none border border-black`}
      style={{
        backgroundColor: bg,
        color,
        opacity: getOpacity(enabled, hover),
      }}
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {text}
    </div>
  );
};

export default Tag;
