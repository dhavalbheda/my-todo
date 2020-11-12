import  { TASK_FETCH_REQUEST, TASK_FETCH_ERROR, TASK_FETCH_SUCCESS, TASK_LOG_OUT, SET_TASK_ALERT, REMOVE_TASK_ALERT, TASK_ALL_DELETE_SUCCESS } from './ActionType'

const initialState = {
    taskList: [],
    taskAlert: null,
    loadding: false
}

const TaskReducer = (state = initialState, action) => {
    const {type, payload} = action

    switch(type) {
        case TASK_FETCH_REQUEST:
            return {
                ...state,
                loadding: true,
            }
        case TASK_FETCH_SUCCESS:
            return {
                ...state,
                taskList: payload,
                loadding: false,
            }
        case TASK_FETCH_ERROR:
            return {
                ...state,
                taskList: [],
                loadding: false,
            }
        case TASK_LOG_OUT:
            return {
                ...initialState
            }
        case SET_TASK_ALERT:
            return {
                ...state,
                taskAlert: payload
            }
        case REMOVE_TASK_ALERT:
            return {
                ...state,
                taskAlert: null
            }
        case TASK_ALL_DELETE_SUCCESS:
            return initialState
        default: 
            return state
    }
} 

export default TaskReducer