import { useState, useEffect } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import "bootstrap/dist/css/bootstrap.min.css";
import TodoItem from "./TodoItem";
import cookie from "cookiejs";
import TodoDataTable from "./TodoDataTable";
import { MdDelete, MdEdit } from "react-icons/md";
import "../styles/modules/todoItem.css";
import toast from "react-hot-toast";
import TodoModal from "./TodoModal";
import moment from "moment";
import CheckButton from "./CheckButton";

const AppContent = () => {
  const [todoList, setTodoList] = useState([]);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [editModal, setEditModal] = useState({});
  const [addUpDateModal, setAddUpDateModal] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const token = cookie.get("token");
    await axios
      .get("http://localhost:4000/api/aya/todo/", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setTodoList(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

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
  const handleEdit = () => {
    setUpdateModalOpen(true);
  };

  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>DESCRIPTION</th>
            {/* <th>EXPIRATION</th> */}
            <th>CATEGORY</th>
            <th>STATUS</th>
            <th style={{ textAlign: "center" }}>ACTION</th>
          </tr>
        </thead>
        <tbody>
          <TodoModal setTodoList={setTodoList} />
          {todoList.todo
            ? todoList.todo.map((todo) => (
                <tr style={{ fontSize: "15px" }} key={todo._id}>
                  <TodoModal
                    todo={todo}
                    type="update"
                    modalOpen={updateModalOpen}
                    setModalOpen={setUpdateModalOpen}
                    fetchData={fetchData}
                    updateTodoList={setTodoList}
                    setEditModal={setEditModal}
                    setAddUpDateModal={todoList}
                  />
                  <td>
                    <CheckButton />
                  </td>
                  <td>{todo.description}</td>
                  {/* <td>{moment(todo.expiration).format(" YYYY,MMM D,")}</td> */}
                  <td>{todo.category}</td>
                  <td>{todo.isCompleted}</td>
                  <td>
                    <div className="todoActions">
                      <div
                        className="icon"
                        onClick={() => handleDelete(todo._id)}
                      >
                        <MdDelete />
                      </div>
                      <div
                        className="icon"
                        onClick={() => handleEdit(todo._id)}
                      >
                        <MdEdit />
                      </div>
                    </div>
                  </td>
                </tr>
              ))
            : "No Todo"}
        </tbody>
      </Table>
    </div>
  );
};

export default AppContent;
