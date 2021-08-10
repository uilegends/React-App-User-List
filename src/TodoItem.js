import React, { Component } from 'react'
import './App.css'
class TodoItem extends Component {

 state = {
  isEditing: false
 };

 toggleIsEditing = () => {
  this.setState({
   isEditing: !this.state.isEditing
  })
 }

 clickHandler = () => {
  this.props.toggleComplete(this.props.index);
 }

 deleteItemfromtoList = () => {
  this.props.deleteTodoList(this.props.index);
 }

 editEventformSubmit = (event) => {
  event.preventDefault();
  this.props.editTodofromState(this.props.index, this.newText.value);
  this.toggleIsEditing();
 }

 render() {
  const { todo } = this.props;
  if (this.state.isEditing) {
   return (
    <li>
     <form onSubmit={this.editEventformSubmit}>
      <input type="text"
       defaultValue={todo.text}
       ref={node => {
        this.newText = node
       }}
      />
      <button>Save</button>
      <button onClick={this.toggleIsEditing}>Cancel</button>
     </form>
    </li>
   )
  }
  return (
   <div>
    <li  className={todo.completed ? "completed" : ""}>
     <span onClick={this.clickHandler}> {todo.text}</span>
     <span>
      <button onClick={this.toggleIsEditing}>Edit</button>
      <button onClick={this.deleteItemfromtoList}>Delete</button>
     </span>
    </li>
   </div>
  )
 }
}

export default TodoItem
