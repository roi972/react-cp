export const GET_TASKS = '[tasks] GET TASKS';
export const ADD_TASK = '[tasks] ADD TASK';
export const UPDATE_TASK = '[tasks] UPDATE TASK';

const baseFeedUrl = 'https://nztodo.herokuapp.com/api/task/?format=json';

export function getTasks(search) {
    return async function (dispatch) {
        let feedUrl = baseFeedUrl;
        if (search && search.length > 0) {
            search= search.replace('?', '&');
            feedUrl = feedUrl + search;
        }
        try {
            console.log('Calling API:', feedUrl);
            const response = await fetch(feedUrl);            
            if (response.status !== 404) {
                const tasks = await response.json();
                dispatch({ type: GET_TASKS, payload: tasks });
            }
            else{
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