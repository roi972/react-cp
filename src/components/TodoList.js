import React, { Component } from 'react';
import TodoItem from './TodoItem';


const feedUrl = 'https://nztodo.herokuapp.com/api/task/?format=json';

class TodoList extends React.Component {

    state = {
        data: [],
        isLoading: true,
        error: null
    }
    componentDidMount() {

        fetch(feedUrl)
            .then(res => res.json())
            .then(data => this.setState({ data: data, isLoading: false }))
            .catch(error => this.setState({ isLoading: false, error: error }));

    }
    render() {

        let todos = this.state.data.map((item, index) => {
            return (
                <TodoItem item={item} key={index} />
            )
        })
        if (this.state.error) {
            return <p>Failed to get data: {this.state.error.message}</p>
        }
        if (this.state.isLoading) {
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

export default TodoList;
