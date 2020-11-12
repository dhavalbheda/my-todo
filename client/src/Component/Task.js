import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { createTask, deleteTask, editTask, fetchTaskData, logoutTask, deleteAllTask } from '../Redux/Task/TaskAction'
import { logoutUser } from '../Redux/User/UserAction'
import Alert from './Alert'

const Task = () => {
    const {user, userAlert} = useSelector(state => state.User)
    const {taskAlert, taskList} = useSelector(state => state.Task)
    const [activeItem, setActiveItem] = useState({
        id: null,
        title: '',
        completed: false
      })
    const dispatch = useDispatch()

    useEffect(() => {
      dispatch(fetchTaskData({username:user.username, id: user.id}))
    }, [dispatch,user.username,user.id])
    
    const taskDelete = (taskid) => {
      dispatch(deleteTask({username:user.username, id: user.id, taskid}))
    }
    
    const taskEdit = (task) => {
      setActiveItem({id: task.id, title: task.title, completed: task.completed})
    }

    const logout = () => {
      dispatch(logoutUser(user.username))
      dispatch(logoutTask())
    }
      
    const deleteAll = (event) => {
      event.preventDefault()
      dispatch(deleteAllTask({username: user.username, id: user.id}))
    }

    const onsubmit = (e) => {
      e.preventDefault()
      if(activeItem.id != null) {
        let task = {title: activeItem.title, completed: activeItem.completed}
        dispatch(editTask({username: user.username, id: user.id, taskid: activeItem.id, task}))
      } else {
        dispatch(createTask({username: user.username, id: user.id, title: activeItem.title}))
      }
      setActiveItem({id: null, title: '', completed: false})
    }

    const onchange = (e) => {
      setActiveItem({
          ...activeItem,
          title: e.target.value
      })
    }

    const changeStatus = (task) => { 
      let newTask = {title: task.title, completed: !task.completed}
      dispatch(editTask({username: user.username, id: user.id, taskid: task.id, task:newTask}))
    }

    const clearActiveItem = () => {
      setActiveItem({id: null, title: '', completed: false})
    }
    
    return <Fragment>
      <div className="container">
        {userAlert && <Alert alert={userAlert}/>}
        {taskAlert && <Alert alert={taskAlert}/>}
        <div className="row justify-content-end m-5">
            <Link to="/profile" className = "h3 custom-icon "><i className = " fas fa-user-alt"></i></Link>
            <p className = "h3 custom-icon ml-4" onClick={logout}><i className = " fas fa-sign-out-alt"></i></p>
        </div>
        <div id="task-container">
          <div id="form-wrapper">
            <form id="form" onSubmit={onsubmit}>
              <div className="row">
                <div className="col-12 col-md-8">
                  <textarea onChange={e => onchange(e)} value={activeItem.title} className="form-control" type="text" placeholder="Enter Task" maxLength="4500" required></textarea>
                </div>
                <div className="col-12 col-md-4 mt-2 mt-md-0 px-md-0">
                  {!activeItem.id 
                    ? (<> 
                        <button id="submit" className="btn btn-custom w-auto">Add</button>
                        {taskList.length > 0 && <button id="submit" className="btn btn-danger w-auto" onClick={(e) => deleteAll(e)}>Delete All</button>}
                      </>)
                    : (<>
                        <button id="submit" className="btn btn-custom w-auto">Edit</button>
                        <button className="btn btn-danger px-2 ml-2" onClick={() => clearActiveItem}>Calcel</button>
                      </>)
                  }
                </div>
              </div>
            </form>
          </div>

          <div id="list-wrapper">
            {taskList.map((item,index) => <TaskList task = {item} 
                                                    key = {index} 
                                                    taskDelete = {taskDelete}
                                                    taskEdit = {taskEdit}
                                                    changeStatus = {changeStatus} />)}
          </div>

        </div>
      </div>
    </Fragment>
}

const TaskList = ({task, taskEdit, taskDelete, changeStatus}) => {
    return <Fragment > 
      <div className="task-wrapper">
        <div  className="overflow-auto" onClick={() => changeStatus(task)}>
          {task.completed 
            ? <strike>{task.title}</strike>
            :  <span className="h5">{task.title}</span>}
          
        </div>
        <div className="flex-wrapper mt-3">
          <span className="" >{getDate(task.date)}</span>
            <span className="btn btn-sm btn-outline-info  ml-4" onClick= {() => taskEdit(task)}>Edit</span>
            <span className="btn btn-sm btn-outline-dark ml-3" onClick = {() => taskDelete(task.id)}>Delete</span>
        </div>
      </div>
    </Fragment>
}
const getDate = (date) => {
  let options = { weekday: 'short', year: 'numeric', month: 'numeric', day: 'numeric' };
  return new Date(date).toLocaleString('en-US', options);
}
export default Task