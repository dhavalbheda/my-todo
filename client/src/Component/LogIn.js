import React, { Fragment, useState } from 'react'
import '../App.css';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../Redux/User/UserAction';
import { Link, Redirect } from 'react-router-dom';
import Alert from './Alert';

const LogIn = () => {
    const {isLogin, userAlert} = useSelector(state => state.User)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()

    if (isLogin) 
        return <Redirect to="/" />
    
        const onsubmit = (event) => {
        event.preventDefault()
        dispatch(loginUser({username, password}))
    }
    return <Fragment>
        <div className="container w-80">
            {userAlert && <Alert alert={userAlert}/>}
            <div id="task-container">
                <h1 className="text-center pt-3 cart-title">Sign-In</h1>
                <form id="form" className="m-4 p-4" onSubmit={e=> onsubmit(e)}>
                    <div className="form-group">
                        <label>Username or Email Address</label>
                        <input type="text" 
                            className="form-control"   
                             placeholder="Enter Username or Email Address"
                            value={username}
                            onChange={e => setUsername(e.target.value)}  required/>
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" 
                            className="form-control" 
                            placeholder="Enter Password" 
                            autoComplete="false"
                            value={password}  
                            onChange={e => setPassword(e.target.value)} required/>
                    </div>
                    <p className="text-center" ><Link to="/signup" >Don't Have Account</Link></p>
                    <div className="col-md-12 text-center ">
                        <button type="submit" className="btn btn-block btn-primary ">Sign-In</button>
                    </div>
                </form>
            </div>
        </div>
    </Fragment>

}

export default LogIn