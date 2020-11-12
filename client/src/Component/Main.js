import React, { Fragment, useEffect } from 'react'
import LogIn from './LogIn';
import SignUp from './SignUp';
import Profile from './Profile';
import { useDispatch } from 'react-redux';
import { getUserDetail } from '../Redux/User/UserAction'
import {HashRouter as Router, Route, Switch} from 'react-router-dom';
import Task from './Task';
import PrivateRoute from './PrivateRoute';


const Main = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        let user = localStorage.getItem('todo-user')
        if(user !== "" && user != null) {
            user = JSON.parse(user)
            dispatch(getUserDetail(user))
        }
    })
    return <Fragment>
        <Router>
            <Switch>
                <Route exact path="/login" component={LogIn} />
                <Route exact path="/signup" component={SignUp} />
                <PrivateRoute path="/profile" component={Profile} />
                <PrivateRoute path="/" component={Task} />
            </Switch>
        </Router>
    </Fragment>
}
 
export default Main;
