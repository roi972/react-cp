import React from 'react';

const TodoItem = (props) => {
    //console.log(props.item);
    return <li className='collection-item indigo lighten-4'>
        <span className='Title'>
            <h5 className=''> {props.item.title} </h5>
        </span>
        <p>{props.item.description}<br />
            {props.item.when}

        </p>

    </li>;
}

export default TodoItem;