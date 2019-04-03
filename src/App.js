import React, { Component } from 'react';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';
import { Provider } from 'react-redux';
import store from './redux/store';


class App extends Component {
  render() {
    return (
      <div className="container">
        <Provider store={store}>
          <TodoForm />
          <hr />
          <TodoList />
        </Provider>
      </div>
    );
  }
}

export default App;
