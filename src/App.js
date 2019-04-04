import React, { Component } from 'react';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';
import { Provider } from 'react-redux';
import store from './redux/store';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import TodoPage from './components/TodoPage';


class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>

          <Provider store={store}>
            <Route path="/" exact component={TodoList} />
            <Route path="/todo/add" exact component={TodoForm} />
            <Route path="/todo/:id" exact component={TodoPage} />
          </Provider>

        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
