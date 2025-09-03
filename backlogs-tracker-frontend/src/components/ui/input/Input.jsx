import React from "react";
import { twMerge } from "tailwind-merge";

const Input = ({ type = "text", value, onChange, placeholder, className }) => {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={twMerge(
        "border border-[#4F4362] py-2 p-2 text-md outline-none transition-all",
        className
      )}
    />
  );
};

export default Input;
