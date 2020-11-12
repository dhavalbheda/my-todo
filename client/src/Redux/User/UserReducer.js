import  { USER_FETCH_REQUEST, USER_FETCH_ERROR, USER_FETCH_SUCCESS, USER_LOG_OUT, USER_UPDATE_SUCCESS, SET_ALERT, REMOVE_ALERT } from './ActionType'

const initialState = {
    user:{},
    isLogin:false,
    loadding: false,
    userAlert: null
}

const UserReducer = (state = initialState, action) => {
    const {type, payload} = action
    switch(type) {
        case USER_FETCH_REQUEST:
            return {
                ...state,
                loadding: true,
            }
        case USER_FETCH_SUCCESS:
        case USER_UPDATE_SUCCESS:
            return {
                ...state,
                user: payload,
                loadding: false,
                isLogin: true
            }
        case USER_FETCH_ERROR:
            return {
                ...state,
                user:{},
                loadding: false,
                isLogin: false
            }
        case SET_ALERT:
            return {
                ...state,
                userAlert: payload
            }
        case REMOVE_ALERT:
            return {
                ...state,
                userAlert: null
            }
        case USER_LOG_OUT:
            return {
                ...initialState
            }
        default:
             return state
    }
} 

export default UserReducer