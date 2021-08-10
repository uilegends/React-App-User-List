import React, { Component } from 'react'
import ReactDom from 'react-dom';
import AddTodo from './AddTodo';
import TodoItem from './TodoItem';
export class Index extends Component {

 // Define state
 state = {
  todos: [
   {
    text: "Buy Milk",
    completed: true
   },
   {
    text: "Buy Egg",
    completed: false
   }
  ]
 }

 // Change state
 addTodoToState = (text) => {
  const newTodo = this.state.todos.concat({
   text,
   completed: false
  })
  this.setState({
   todos: newTodo
  })
 }

 deleteTodoList = (index) => {
  const newTodo = this.state.todos.filter((todo, i) => {
   return index === i ? false : true;
  });
  this.setState({
   todos: newTodo
  })
 }

 editTodofromState = (index, newText) => {
  const newTodos = this.state.todos.map((todo, i) => {
   if (index === i) {
    return {
     ...todo,
     text: newText
    }
   }
   return todo;
  })
  this.setState({
   todos: newTodos
  })
 }


 toggleComplete = (index) => {
  const newTodo = this.state.todos.map((todo, i) => {
   if (index === i) {
    return {
     ...todo,
     completed:!todo.completed
     }
   }
   return todo;
  })
  this.setState({
   todos: newTodo
  })
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
        todo={todo} index={index}  key={index} />
      )
     })}
    </ul>
    <AddTodo addTodoToState={this.addTodoToState} />
   </div>
  )
 }
}

export default Index


ReactDom.render(<Index />, document.querySelector('#root'));

