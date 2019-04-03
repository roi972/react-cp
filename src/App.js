import React, { Component } from 'react';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';
import { Provider } from 'react-redux';
import store from './redux/store';
import { BrowserRouter, Route, Switch } from 'react-router-dom';


class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>

          <Provider store={store}>
            <Route path="/" exact component={TodoList} />
            <Route path="/add" exact component={TodoForm} />
          </Provider>

        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
