import React, { Component } from 'react'

export class AddTodo extends Component {

 // Initialy state is empty
 state = {
  todoText: ""
 }

 // After form Submit 
 submitHandler = (event) => {
  event.preventDefault();
  this.props.addTodoToState(this.state.todoText);
  this.setState({
   todoText: ''
  })
 }
 
 // Changeing text in input box
 changeTodoText = (event) => {
  this.setState({
   todoText: event.target.value
  })
 }
 
 render() {
  return (
   <div>
    <form onSubmit={this.submitHandler }>
     <input type="text" onChange={this.changeTodoText} value={this.state.todoText} />
      <button type="submit">Click</button>
    </form>
   </div>
  )
 }
}

export default AddTodo
