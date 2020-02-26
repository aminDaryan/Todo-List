
import React, { Component } from 'react'
import TodoList from './component/Todo-Form'

export default class App extends Component {
  constructor(){
    super()
  }
  render() {
    return (
      <div>
        <TodoList />
      </div>
    )
  }
}
