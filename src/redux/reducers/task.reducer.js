import { GET_TASKS, ADD_TASK } from '../actions'

const initialState = {
    tasks: []
}

export default function taskReducer(state = initialState, action) {
    console.log('Action:', action.type, "Payload:", action.payload);
    switch (action.type) {
        case GET_TASKS:
            return { ...state, tasks: action.payload }

        case ADD_TASK:
            const newTasks = [...state.tasks];
            newTasks.push(action.payload);
            const newState = { ...state, tasks: newTasks };
            return newState;

        default:
            return state;
    }
}