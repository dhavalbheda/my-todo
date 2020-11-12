import { combineReducers } from 'redux'
import TaskReducer from './Task/TaskReducer'

import UserReducer from './User/UserReducer'

const rootReducer = combineReducers({
    User: UserReducer,
    Task: TaskReducer
})

export default rootReducer