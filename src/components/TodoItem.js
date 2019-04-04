import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { deleteTask } from '../redux/actions';

const TodoItem = (props) => {

    const handleClick = (e) => {
        props.history.push(`/todo/${props.item.id}`, props.item.id);
    }

    const handleDelete = (item, e) => {
        props.deleteTask(item);
        e.target.blur();
        
    }

    return (
        <li className='collection-item indigo lighten-4'>
            <div onClick={handleClick}>
                <span className='Title'>
                    <h5 className=''> {props.item.title} </h5>
                </span>
                <p>{props.item.description}<br />
                    {props.item.when}
                </p>
            </div>
            <span><button onClick={e => { handleDelete(props.item, e) }}>Delete</button></span>

        </li>
    )
}

export default withRouter(connect(function (state) {
    return {
        tasks: state.tasks
    }
}, function (dispatch) {
    return {
        deleteTask: (task) => dispatch(deleteTask(task))
    }
})(TodoItem));
