import React, { Component } from "react";
import ReactDom from "react-dom";
import AddTodo from "./AddTodo";
import TodoItem from "./TodoItem";
import axios from "axios";
import { URL } from "./Constants";
export class Index extends Component {
  // Define state
  state = {
    todos: [],
  };

  componentDidMount() {
    axios.get(`${URL}`).then((result) => {
      this.setState({
        todos: result.data,
      });
    });
  }

  // Change state for adding
  addTodoToState = (text) => {
    axios
      .post(`${URL}`, {
        text,
        completed: false,
      })
      .then((result) => {
        const newTodo = this.state.todos.concat({
          text,
          completed: false,
        });
        this.setState({
          todos: newTodo,
        });
      });
  };

  deleteTodoList = (index) => {
    const { todos } = this.state;
    const todo = todos[index];
    axios.delete(`${URL}${todo.id}`).then((res) => {
      const newTodo = todos.filter((todo, i) => {
        return index === i ? false : true;
      });
      this.setState({
        todos: newTodo,
      });
    });
  };

  editTodofromState = (index, newText) => {
    const { todos } = this.state;
    const todo = todos[index];
    axios.put(`${URL}${todo.id}`, { ...todo, text: newText }).then((result) => {
      const newTodos = todos.map((todo, i) => {
        if (index === i) {
          return {
            ...todo,
            text: newText,
          };
        }
        return todo;
      });
      this.setState({
        todos: newTodos,
      });
    });
  };

  toggleComplete = (index) => {
    const { todos } = this.state;
    const todo = todos[index];
    const newTodo = todos.map((todo, i) => {
      if (index === i) {
        return {
          ...todo,
          completed: !todo.completed,
        };
      }
      return todo;
    });

    axios
      .put(`${URL}${todo.id}`, { ...todo, completed: !todo.completed })
      .then((res) => {
        this.setState({
          todos: newTodo,
        });
      });
  };
  // Unmounted
  componentWillUnmount() {
    // fix Warning: Can't perform a React state update on an unmounted component
    this.setState = (state, callback) => {
      return;
    };
  }

  render() {
    return (
      <div>
        <ul>
          {this.state.todos.map((todo, index) => {
            return (
              <TodoItem
                editTodofromState={this.editTodofromState}
                deleteTodoList={this.deleteTodoList}
                toggleComplete={this.toggleComplete}
                todo={todo}
                index={index}
                key={index}
              />
            );
          })}
        </ul>
        <AddTodo addTodoToState={this.addTodoToState} />
      </div>
    );
  }
}

export default Index;

ReactDom.render(<Index />, document.querySelector("#root"));
