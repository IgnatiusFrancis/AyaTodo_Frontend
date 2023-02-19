import React, { useEffect, useReducer, useState } from "react";
import axios from "axios";
import moment from "moment";
import "../styles/modules/modal.css";
import { MdOutlineClose } from "react-icons/md";
import Button from "./Button";
import toast from "react-hot-toast";
import TodoItem from "./TodoItem";
import cookie from "cookiejs";

const TodoModal = ({
  type,
  modalOpen,
  setModalOpen,
  fetchData,
  updateTodoList,
  todo,
  setTodoListUpdate,
  setTodoList,
  setEditModal,
  setAddUpDateModal,
}) => {
  const initialValue = {
    description: "",

    category: "",
    isCompleted: false,
  };

  const [formData, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case "update":
        return {
          ...todo,
          [action.inputName]: action.inputValue,
        };
      case "inputChange":
        return {
          ...state,
          [action.inputName]: action.inputValue,
        };
      default:
        return initialValue;
    }
  }, initialValue);

  useEffect(() => {
    if (type === "update" && todo) {
      dispatch({ type: "update" });
    } else {
      dispatch({ type: "default" });
    }
  }, [type, modalOpen, todo]);

  const handleChange = (event) => {
    dispatch({
      type: "inputChange",
      inputName: event.target.name,
      inputValue: event.target.value,
    });
  };

  let form;
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    form = {
      description: data.get("description"),

      category: data.get("category"),
      isCompleted: data.get("isCompleted"),
    };

    if (form === "") {
      toast.error("Please enter a Task");
      return;
    }
    if (form) {
      if (type === "add") {
        handleAdd();

        toast.success("Task Added Successfully");
      }
      if (type === "update") {
        //|| todo.isCompleted!== form.isCompleted
        if (
          todo.description !== form.description ||
          todo.expiration !== form.expiration ||
          todo.isCompleted !== form.isCompleted
        ) {
          // <TodoItem handleEdit={handleEdit} />;
          handleEdit(todo?._id);
          console.log(todo?._id);

          toast.success("Task Updated Successfully");
        } else {
          toast.error("No Changes Made");
        }
      }
      setModalOpen(false);
    }
  };

  const handleEdit = async (_id) => {
    await axios
      .patch(`http://localhost:4000/api/aya/todo/${_id}`, form)
      .then((res) => {
        // setFormData(initialValue);
        fetchData();
      })
      .catch((err) => {
        console.log("Failed to update todo");
        console.log(err.message);
      });
  };

  const handleAdd = async () => {
    await axios
      .post("http://localhost:4000/api/aya/todo/", form)
      .then((res) => {
        setAddUpDateModal(res.data.todo);
      })
      .catch((err) => {
        console.log("Error couldn't create TODO");
        console.log(err.message);
      });
  };

  return (
    <>
      {modalOpen && (
        <div className="wrapper">
          <div className="containerModal">
            <div
              className="closeButton"
              onClick={() => setModalOpen(false)}
              // onKeyDown={() => setModalOpen(false)}
            >
              <MdOutlineClose />
            </div>
            <form className="form" onSubmit={handleSubmit}>
              <h1 className="formdescription">
                {type === "update"
                  ? "Update"
                  : type === "add"
                  ? "Add Task"
                  : ""}
              </h1>
              <label htmlFor="description" style={{ width: "100%" }}>
                Description
                <input
                  type="text"
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                />
              </label>

              <div>
                <label htmlFor="category" style={{ width: "100%" }}>
                  Category
                  <select
                    name="category"
                    id="category"
                    value={formData.category}
                    onChange={handleChange}
                  >
                    <option default> Select Category</option>
                    <option value="personal"> Personal</option>
                    <option value="work"> Work</option>
                  </select>
                </label>
              </div>
              <div>
                <label htmlFor="isCompleted" style={{ width: "100%" }}>
                  Status
                  <select
                    name="isCompleted"
                    id="isCompleted"
                    value={formData.isCompleted}
                    onChange={handleChange}
                  >
                    <option value="incomplete"> Incomplete</option>
                    <option value="complete"> Complete</option>
                  </select>
                </label>
              </div>
              <div className="buttonContainer">
                <Button type="submit" colorVariant="primary">
                  {type === "update"
                    ? "Update"
                    : type === "add"
                    ? "Add Task"
                    : ""}
                </Button>
                <Button
                  type
                  colorVariant="secondary"
                  onClick={() => setModalOpen(false)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default TodoModal;
