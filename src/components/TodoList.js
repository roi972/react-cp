import React, { Component } from 'react';
import TodoItem from './TodoItem';
import { connect } from 'react-redux';
import { getTasks } from '../redux/actions';
import Search from './Search';
import { Route } from 'react-router-dom';


class TodoList extends React.Component {
    
    componentDidMount() {
        this.props.getTasks();
    }

    componentDidUpdate() {       
        if (this.props.history.location.search && this.props.history.location.search !== this.search) {
            this.props.getTasks(this.props.history.location.search);
            this.search = this.props.history.location.search;
        }
    }
    render() {
        let todos = this.props.tasks.map((item, index) => {
            return (
                <TodoItem item={item} key={index} />
            )
        })


        return (
            <div className="container">
                <Route component={Search} />
                {this.props.tasks.length !== 0 ?

                    <div className='collection'>
                        <ul>
                            {todos}
                        </ul>
                    </div>
                    : <div>Nothing found</div>}
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
            getTasks: (search) => dispatch(getTasks(search))
        }
    }
)(TodoList);
