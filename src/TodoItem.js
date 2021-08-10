import React, { Component } from 'react'
import './App.css'
class TodoItem extends Component {

clickHandler = () => {
  this.props.toggleComplete(this.props.index);
 }

 render() {
  const { todo } = this.props;
  return (
   <div>
    <li onClick={this.clickHandler} className={todo.completed? "completed": ""}>{todo.text}</li>
   </div>
  )
 }
}

export default TodoItem
