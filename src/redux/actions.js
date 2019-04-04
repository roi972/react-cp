export const GET_TASKS = '[tasks] GET TASKS';
export const ADD_TASK = '[tasks] ADD TASK';
export const UPDATE_TASK = '[tasks] UPDATE TASK';
export const GET_SINGLE_TASK = '[tasks] GET SINGLE TASK';
export const DELETE_TASK = '[tasks] DELETE TASK';

const baseFeedUrl = 'https://nztodo.herokuapp.com/api/task/?format=json';

export function getTasks(search) {
    return async function (dispatch) {
        let feedUrl = baseFeedUrl;
        if (search && search.length > 0) {
            search = search.replace('?', '&');
            feedUrl = feedUrl + search;
        }
        try {
            const response = await fetch(feedUrl);
            if (response.status !== 404) {
                const tasks = await response.json();
                dispatch({ type: GET_TASKS, payload: tasks });
            }
            else {
                dispatch({ type: GET_TASKS, payload: [] });
            }

        }
        catch (e) {
            console.log('error:', e);
            dispatch({ type: GET_TASKS, payload: [] });
        }
    }
}


export function addTask(values, actions) {
    return async function (dispatch) {

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

export function getTask(id) {
    return async function (dispatch) {
        const response = await fetch(`https://nztodo.herokuapp.com/api/task/${id}/?format=json`);
        const task = await response.json();

        dispatch({ type: GET_SINGLE_TASK, payload: task })
    }
}

export function updateTask(id, values, actions) {
    return async function (dispatch) {
        console.log('update task', id, " with values:", JSON.stringify(values));
        try {
            const response = await fetch(`https://nztodo.herokuapp.com/api/task/${id}/`, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(values)
            });
            console.log("Update response: ", response);
            const task = await response.json();
            actions.setSubmitting(false);
            dispatch({ type: UPDATE_TASK, payload: task });
        }
        catch (e) {
            console.log("Failed to update: ", e);
            dispatch({ type: UPDATE_TASK, payload: e });
        }

    }
}

export function deleteTask(task) {
    return async function (dispatch) {
        try {
            const response = await fetch(`https://nztodo.herokuapp.com/api/task/${task.id}/`, {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json"
                }
            });
            console.log('Delete response: ', response);
            dispatch({ type: DELETE_TASK, payload: task })
        }
        catch (e) {
            console.log(e);
        }
    }
}