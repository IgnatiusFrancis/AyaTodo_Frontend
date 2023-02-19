import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

import { MdDelete, MdEdit } from "react-icons/md";
import "../styles/modules/todoItem.css";
import CheckButton from "./CheckButton";
import TodoModal from "./TodoModal";

const TodoItem = ({
  todo,
  // todoList,
  setTodoList,
  fetchData,
}) => {
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  // const [checked, setChecked] = useState(false);
  // const [updatedTodo, setUpdatedTodo] = useState([])

  const handleDelete = async (_id) => {
    await axios
      .delete(`http://localhost:4000/api/aya/todo/${_id}`)
      .then((res) => {
        fetchData();
        toast.success("Deleted Successfully");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  const handleEdit = ({ _id, description, isCompleted, expiration }) => {
    console.log(_id);
    console.log(description);
    console.log(isCompleted);
    console.log(expiration);
    setUpdateModalOpen(true);
  };
  return (
    <>
      <div className="item">
        <div className="todoDetails">
          <CheckButton />
          <div className="texts">
            <p className="todoText, todoText--completed"> {todo.description}</p>
          </div>
        </div>
        <div className="todoDetails">
          <CheckButton />
          <div className="texts">
            <p className="time"> {todo.createdAt} </p>
          </div>
        </div>
        <div className="todoDetails">
          <CheckButton />
          <div className="texts">
            <p className="todoText, todoText--completed"> {todo.category}</p>
          </div>
        </div>
        <div className="todoDetails">
          <CheckButton />
          <div className="texts">
            <p className="todoText, todoText--completed"> {todo.isCompleted}</p>
          </div>
        </div>
        <div className="todoActions">
          <div className="icon" onClick={() => handleDelete(todo._id)}>
            <MdDelete />
          </div>
          <div className="icon" onClick={() => handleEdit(todo._id)}>
            <MdEdit />
          </div>
        </div>
      </div>

      <TodoModal
        type="update"
        modalOpen={updateModalOpen}
        setModalOpen={setUpdateModalOpen}
        fetchData={fetchData}
        todo={todo}
        updateTodoList={setTodoList}
      />
    </>
  );
};

export default TodoItem;
