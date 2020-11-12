import Axios from 'axios'
import  { USER_FETCH_REQUEST, USER_FETCH_ERROR, USER_FETCH_SUCCESS, USER_LOG_OUT, USER_UPDATE_SUCCESS, SET_ALERT, REMOVE_ALERT } from './ActionType'

const BASE_URL = "https://dhaval-todo-app.herokuapp.com"

export const fetchRequest = () => {
    return {
        type: USER_FETCH_REQUEST,
        payload: null
    }
}

export const fetchSuccess = (data) => {
    return {
        type: USER_FETCH_SUCCESS,
        payload: data
    }
}

export const fetchError = (error) => {
    return {
        type: USER_FETCH_ERROR,
        payload: error
    }
}

export const updateSuccess = (data) => {
    return {
        type: USER_UPDATE_SUCCESS,
        payload: data
    }
}

export const setAlert = (data) => {
    return {
        type: SET_ALERT,
        payload: data
    }
}

export const removeAlert = (data) => {
    return {
        type: REMOVE_ALERT,
        payload: data
    }
}

export const logout = () => {
    return {
        type: USER_LOG_OUT,
        payload: null
    }
}


export const signUpUser = (user, confirmPassword) => {
    return dispatch => {
        if(user.password !== confirmPassword) {
            dispatch(setAlert({type:'danger', message: "Password and Confirm Password does not match"}))
            setTimeout(() => dispatch(removeAlert()), 3000);
        } else {
            dispatch(fetchRequest())
            Axios.post(`${BASE_URL}/api/user-create/`, {...user})
            .then(res =>  {
                const data = res.data
                dispatch(fetchSuccess(data))
                localStorage.setItem('todo-user', JSON.stringify({id: data.id, username:data.username, email: data.email}))
                dispatch(setAlert({type:'success', message: `Welcome ${data.username}!  Thank You For The Registration :)`}))
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
}

export const loginUser = (user) => {
    return dispatch => {
        dispatch(fetchRequest())
        Axios.post(`${BASE_URL}/api/user-login/`, {...user})
        .then(res =>  {
            const data = res.data
            dispatch(fetchSuccess(data))
            localStorage.setItem('todo-user', JSON.stringify({id: data.id, username:data.username, email: data.email}))
            
            dispatch(setAlert({type:'success', message: `Welcome ${data.username}!  We Are Happy To See You Again :)`}))
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

export const getUserDetail = (user) => {
    return dispatch => {
        dispatch(fetchRequest())
        Axios.post(`${BASE_URL}/api/user-detail/`, {...user})
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

export const updateUser = (oldUser, newUser, confirmPassword) => {
    return dispatch => {
        if(newUser.password !== confirmPassword) {
            dispatch(setAlert({type:'danger', message: "Password and Confirm Password does not match"}))
            setTimeout(() => dispatch(removeAlert()), 3000);
        } else {
            Axios.post(`${BASE_URL}/api/user-update/`, { id: oldUser.id, old_email: oldUser.email, old_username: oldUser.username, ...newUser})
            .then(res =>  {
                const data = res.data
                dispatch(updateSuccess(data))
                dispatch(setAlert({type:'success', message: 'Profile Updated Successfully'}))
                setTimeout(() => dispatch(removeAlert()), 3000);
            })
            .catch(error => {
                const msg = error.response.data.message
                dispatch(setAlert({type:'danger', message: msg}))
                setTimeout(() => dispatch(removeAlert()), 3000);
            })
        }
    }
}

export const logoutUser = (username) => {
    return dispatch => {
        localStorage.setItem('todo-user', '')
        dispatch(logout())
        dispatch(setAlert({type:'primary', message: `By ${username}!  See You Again :)`}))
        setTimeout(() => dispatch(removeAlert()), 3000);
    }
}

