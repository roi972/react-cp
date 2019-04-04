import React from 'react';
import { getTask } from '../redux/actions';
import { connect } from 'react-redux';
import TodoForm from './TodoForm';
import {Route } from 'react-router-dom';
class TodoPage extends React.Component {

    componentDidMount() {
        console.log(this.props.history);
        if (this.props.history.location.state) {
            this.props.getTask(this.props.history.location.state);
        }
    }
    render() {
        let result = <div></div>
        if (this.props.task) {
            result = (
                <>
                    <h1>{this.props.task.title}</h1>
                    <h4>{this.props.task.description}</h4>
                    <hr />
                    <Route component={TodoForm} />
                </>
            )

        }

        return (
            <div className="container">
                {result}
            </div>
        )
    }
}

export default connect(state => {
    return { task: state.task }
},
    dispatch => {
        return {
            getTask: (id) => { dispatch(getTask(id)) }
        }
    })(TodoPage)