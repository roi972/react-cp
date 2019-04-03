export const GET_TASKS = '[tasks] GET TASKS';
export const ADD_TASK = '[tasks] ADD TASK';
export const UPDATE_TASK = '[tasks] UPDATE TASK';

const feedUrl = 'https://nztodo.herokuapp.com/api/task/?format=json';

export function getTasks() {
    return async function (dispatch) {
        const response = await fetch(feedUrl);
        const tasks = await response.json();
        dispatch({ type: GET_TASKS, payload: tasks });
    }
}


export function addTask(values, actions) {
    return async function (dispatch) {
        console.log(values);

        const response = await fetch('https://nztodo.herokuapp.com/api/task/', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(values)
        });
        console.log(response);
        actions.setSubmitting(false);
        dispatch({ type: ADD_TASK, payload: values });
    }
}