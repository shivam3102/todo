import React, { useState, useEffect } from "react";
import { isAuthenticate } from "../auth/index";
import {
  getTodos,
  createTodo,
  deleteTodo,
  createCount,
  getCount,
} from "../helper/apicalls";
import UserInfo from "./UserInfo";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState({
    todo: "",
  });
  const [count, setCount] = useState(0);
  const [reload, setReload] = useState(false);

  const { user, token } = isAuthenticate();

  const preLoad = (userId, token) => {
    getTodos(userId, token).then((response) => {
      if (response.error) {
        console.log(response.error);
      } else {
        setTodos(response);
      }
    });
  };

  useEffect(() => {
    preLoad(user.id, token);
  }, [reload]);

  const onChangeHandler = (event) => {
    console.log(todos.length);
    const { name, value } = event.target;
    setTodo((preValue) => {
      return { ...preValue, [name]: value };
    });
  };

  const onError = (error) => {
    toast.error(`${error}`);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    if (todo.todo.length === 0) {
      return onError("please type a text");
    }
    createTodo(user.id, token, todo).then((response) => {
      if (response.error) {
        onError(response.error);
      } else {
        setTodo((preValue) => {
          return { ...preValue, todo: "" };
        });
        setReload(!reload);
      }
    });
    setCount(count + 1);
    createCount(user.id, token, { count });
  };

  const onDeleteHandler = (todoId) => {
    deleteTodo(user.id, token, todoId);
  };

  const onUpdateHandler = (todoId) => {
    const newTodo = todos.filter((todo) => {
      return todo._id === todoId;
    });
    setTodo((preValue) => {
      return { ...preValue, todo: newTodo[0].todo };
    });
    const newTodos = todos.filter((todo) => {
      return todo._id !== todoId;
    });
    setTodos(newTodos);
    setCount(count + 1);
    onDeleteHandler(todoId);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col m3 s12">
          <UserInfo />
        </div>
        <div className="col m9 s12">
          <div className="todo">
            <h3 className="center-align">Count: {count}</h3>
            <form>
              <div className="row signup">
                <div className="input-field col m6">
                  <input
                    placeholder="enter your text"
                    name="todo"
                    id="todo"
                    value={todo.todo}
                    onChange={onChangeHandler}
                    type="text"
                    className="validate"
                  />
                  <label htmlFor="email" className="active">
                    <h6>Type any text</h6>
                  </label>
                </div>
                <div className="input-field col m12">
                  <button
                    className="waves-effect waves-light btn"
                    onClick={onSubmitHandler}
                  >
                    Add
                  </button>
                </div>
              </div>
            </form>
            {todos.length === 0 ? (
              <h3 className="black-text">No text found </h3>
            ) : (
              todos.map((todo) => {
                return (
                  <div key={todo._id}>
                    <span className="center-align txt">{todo.todo}</span>
                    <span
                      className="btn-floating bxt"
                      onClick={() => onUpdateHandler(todo._id)}
                    >
                      <i className="medium material-icons">delete</i>
                    </span>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Todo;
