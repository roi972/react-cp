import React, { Component } from 'react';
import TodoList from './components/TodoList';
import AddItem from './components/AddItem';

class App extends Component {
  render() {
    return (
      <div className="container">
        <AddItem />
        <hr />
        <TodoList />
      </div>
    );
  }
}

export default App;
