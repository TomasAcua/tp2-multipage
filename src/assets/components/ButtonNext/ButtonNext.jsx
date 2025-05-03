import React from "react";


//Para usar este boton, al invocarlo se le debe poner el emote de la flechitas (Atras o Adelante).
const ButtonNext = ({
  children,
  onClick,
  type = "button",
  className = "",
}) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className={`bg-black/50 text-white p-3 rounded-full hover:bg-black/70 transition duration-200 ${className}`}
    >
      {children}
    </button>
  );
};

export default ButtonNext;
