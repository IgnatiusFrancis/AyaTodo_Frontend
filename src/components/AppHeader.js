import React, { useState } from "react";
import Button, { SelectButton } from "./Button";
import "../styles/modules/appHeader.css";
import TodoModel from "./TodoModal";

const AppHeader = () => {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <div className="appHeader">
      <Button colorVariant="primary" type onClick={() => setModalOpen(true)}>
        Add Task
      </Button>
      <SelectButton id="status">
        <option value="all">All</option>
        <option value="incomplete">Incomplete</option>
        <option value="complete">Complete</option>
      </SelectButton>
      <TodoModel type="add" modalOpen={modalOpen} setModalOpen={setModalOpen} />
    </div>
  );
};

export default AppHeader;
