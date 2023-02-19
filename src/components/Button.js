import React from "react";
import "../styles/modules/button.css";

const buttonTypes = {
  primary: "primary",
  secondary: "secondary",
};

const Button = ({ children, type, colorVariant, ...rest }) => {
  return (
    <button
      className={`button--${buttonTypes[colorVariant]}`}
      type={type === "submit" ? "submit" : "button"}
      {...rest}
    >
      {children}
    </button>
  );
};

function SelectButton({ children, ...rest }) {
  return (
    <select className="button__select" {...rest}>
      {children}
    </select>
  );
}

export { SelectButton };
export default Button;
