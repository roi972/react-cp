import React, { Component } from 'react';
import TodoItem from './TodoItem';
import { connect } from 'react-redux';
import { getTasks } from '../redux/actions';



class TodoList extends React.Component {
    async componentDidMount() {
        await this.props.getTasks();
    }
    render() {
        let todos = this.props.tasks.map((item, index) => {
            return (
                <TodoItem item={item} key={index} />
            )
        })

        if (this.props.tasks.length === 0) {
            return <p>Loading...</p>
        }
        return (

            <div className='collection'>
                <ul>
                    {todos}
                </ul>
            </div>
        )
    }

}

export default connect(
    function (state) {
        return {
            tasks: state.tasks
        }
    },
    function (dispatch) {
        return {
            getTasks: () => dispatch(getTasks())
        }
    }
)(TodoList);
