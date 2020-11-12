import Axios from 'axios'
import  { TASK_FETCH_REQUEST, TASK_FETCH_ERROR, TASK_FETCH_SUCCESS, TASK_LOG_OUT, SET_TASK_ALERT, REMOVE_TASK_ALERT, TASK_ALL_DELETE_SUCCESS } from './ActionType'

const BASE_URL = "https://dhaval-todo-app.herokuapp.com"

export const fetchRequest = () => {
    return {
        type: TASK_FETCH_REQUEST,
        payload: null
    }
}

export const fetchSuccess = (data = null) => {
    return {
        type: TASK_FETCH_SUCCESS,
        payload: data
    }
}

export const fetchError = (error = null ) => {
    return {
        type: TASK_FETCH_ERROR,
        payload: error
    }
}

export const logout = (error = null) => {
    return {
        type: TASK_LOG_OUT,
        payload: null
    }
}

export const setAlert = (data = null) => {
    return {
        type: SET_TASK_ALERT,
        payload: data
    }
}

export const removeAlert = (data = null) => {
    return {
        type: REMOVE_TASK_ALERT,
        payload: data
    }
}

export const deleteAllSuccess = (data = null) => {
    return {
        type: TASK_ALL_DELETE_SUCCESS,
        payload: data
    }
}

export const fetchTaskData = ({username, id}) => {
    return dispatch => {
        dispatch(fetchRequest())
        Axios.post(`${BASE_URL}/api/task-list/`, {username, id})
        .then(res =>  {
            const data = res.data
            dispatch(fetchSuccess(data))
        })
        .catch(error => {
            const msg = error.response.data.message
            dispatch(fetchError())
            dispatch(setAlert({type:'danger', message: msg}))
            setTimeout(() => dispatch(removeAlert()), 3000);
        })
    }
}

export const createTask = ({username, id, title}) => {
    return dispatch => {
        dispatch(fetchRequest())
        Axios.post(`${BASE_URL}/api/task-create/`, {username, id, title})
        .then(res =>  {
           if(res.status === 201) {
               dispatch(fetchTaskData({username, id}))
           } else {
            const msg = res.data.message
            dispatch(fetchError(msg))
           }
        })
        .catch(error => {
            const msg = error.response.data.message
            dispatch(fetchError())
            dispatch(setAlert({type:'danger', message: msg}))
            setTimeout(() => dispatch(removeAlert()), 3000);
        })
    }
}

export const editTask = ({username, id, taskid, task}) => {
    return dispatch => {
        dispatch(fetchRequest())
        Axios.post(`${BASE_URL}/api/task-update/${taskid}/`, {username, id, ...task})
        .then(res =>  {
           if(res.status === 202) {
               dispatch(fetchTaskData({username, id}))
           } else {
            const msg = res.data.message
            dispatch(fetchError(msg))
           }
        })
        .catch(error => {
            const msg = error.response.data.message
            dispatch(fetchError())
            dispatch(setAlert({type:'danger', message: msg}))
            setTimeout(() => dispatch(removeAlert()), 3000);
        })
    }
}

export const deleteTask = ({username, id, taskid}) => {
    return dispatch => {
        dispatch(fetchRequest())
        Axios.post(`${BASE_URL}/api/task-delete/${taskid}/`, {username, id})
        .then(res =>  {
           if(res.status === 202) {
               dispatch(fetchTaskData({username, id}))
           } else {
            const msg = res.data.message
            dispatch(fetchError(msg))
           }
        })
        .catch(error => {
            const msg = error.response.data.message
            dispatch(fetchError())
            dispatch(setAlert({type:'danger', message: msg}))
            setTimeout(() => dispatch(removeAlert()), 3000);
        })
    }
}

export const logoutTask = () => {
    return dispatch => {
        dispatch(logout())
    }
}

export const deleteAllTask = ({username, id}) => {
    return dispatch => {
        Axios.post(`${BASE_URL}/api/task-all-delete/`, {username, id})
        .then(res =>  {
            dispatch(deleteAllSuccess())
            dispatch(setAlert({type:'success', message: 'All Task Deleted..'}))
            setTimeout(() => dispatch(removeAlert()), 3000);
        })
        .catch(error => {
            const msg = error.response.data.message
            dispatch(fetchError())
            dispatch(setAlert({type:'danger', message: msg}))
            setTimeout(() => dispatch(removeAlert()), 3000);
        })
    }
}