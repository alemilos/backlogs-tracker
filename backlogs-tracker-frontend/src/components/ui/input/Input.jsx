import React from "react";
import { twMerge } from "tailwind-merge";

const Input = ({ type = "text", onChange, placeholder, className }) => {
  return (
    <input
      type={type}
      onChange={onChange}
      placeholder={placeholder}
      className={twMerge(
        "border border-[#4F4362] py-2 p-2 text-md outline-none",
        className
      )}
    />
  );
};

export default Input;
