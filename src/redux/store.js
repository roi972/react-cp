import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import taskReducer from '../redux/reducers/task.reducer';

export default createStore(taskReducer, applyMiddleware(
    thunk
))