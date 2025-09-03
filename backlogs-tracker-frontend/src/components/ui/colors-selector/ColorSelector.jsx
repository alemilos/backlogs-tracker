import React from "react";
import { Colors } from "constants/colors";
import CircleTag from "../tag/CircleTag";

const ColorSelector = ({ title, selectedColor, setSelectedColor }) => {
  return (
    <div className="flex gap-4">
      <p className="font-semibold text-lg">{title ? title : "Colore"}</p>
      <div className="flex gap-2">
        {Colors.map((color, index) => {
          return (
            <CircleTag
              key={index}
              bg={color ? color : "#fff"}
              enabled={color === selectedColor}
              onClick={() => setSelectedColor(color)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ColorSelector;
