import React from "react";
import "../styles/modules/pageTitle.css";

const PageTitle = ({ children, ...rest }) => {
  return (
    <p className="title" {...rest}>
      {children}
    </p>
  );
};

export default PageTitle;
