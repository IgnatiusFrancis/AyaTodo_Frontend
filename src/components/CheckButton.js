import React from "react";
import { motion } from "framer-motion";
import "../styles/modules/todoItem.css";

const CheckButton = () => {
  return (
    <motion.div className="svgBox">
      <motion.svg
        className="svg"
        viewBox="0 0 53 38"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.path
          fill="none"
          strokeMiterlimit="10"
          strokeWidth="6"
          d="M1.5 22L16 36.5L51.5 1"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
      </motion.svg>
    </motion.div>
  );
};

export default CheckButton;
