import { GET_TASKS, ADD_TASK, UPDATE_TASK, GET_SINGLE_TASK, DELETE_TASK } from '../actions'

const initialState = {
    tasks: [],
    task: undefined,
    error: undefined
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
        case GET_SINGLE_TASK:
            return { ...state, task: action.payload }

        case UPDATE_TASK:
            return { ...state }
        case DELETE_TASK: {
            const alteredTasks = [...state.tasks];
            alteredTasks.splice(alteredTasks.indexOf(action.payload), 1);
            return { ...state, tasks: alteredTasks }
        }
        default:
            return state;
    }
}