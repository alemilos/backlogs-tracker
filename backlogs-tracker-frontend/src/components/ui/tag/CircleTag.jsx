import React, { useState } from "react";

function getOpacity(enabled, hover) {
  if (enabled) return 0.9;
  if (hover) return 0.5;
  return 0.2;
}

const CircleTag = ({ bg = "#fff", onClick, enabled = false }) => {
  const [hover, setHover] = useState(false);
  return (
    <div
      className={`w-6 h-6 rounded-full cursor-pointer border border-black`}
      style={{
        backgroundColor: bg,
        opacity: getOpacity(enabled, hover),
      }}
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    ></div>
  );
};

export default CircleTag;
