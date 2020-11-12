import React, { Fragment, useEffect, useState } from 'react'
import '../App.css';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../Redux/User/UserAction';
import { Link, Redirect } from 'react-router-dom';
import Alert from './Alert';

const Profile = () => {
    const {isLogin, user, error, userAlert} = useSelector(state => state.User)
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setconfirmPassword] = useState('')
    const [first_name, setFirstName] = useState('')
    const [last_name, setLastName] = useState('')
    const [changePassword, setChangePassword] = useState(false)
    const dispatch = useDispatch()
    
    useEffect(() => {
        if(isLogin) {
            const {username, email, password, first_name, last_name} = user
            setUsername(username)
            setEmail(email)
            setFirstName(first_name)
            setLastName(last_name)
            setPassword(password)
            setconfirmPassword(password)
        }
    }, [isLogin, user])

    if (!isLogin) 
        return <Redirect to="/login" />
    
    const onsubmit = (event) => {
        event.preventDefault()
        dispatch(updateUser(user, {username, password, email, first_name, last_name}, confirmPassword))
    }
    return <Fragment>
        <div className="container w-md-50">
            {userAlert && <Alert alert={userAlert}/>}
            <div id="task-container">
                <h1 className="text-center pt-3 cart-title">My Profile</h1>
                <form id="form" className="mx-4 px-4 py-3"  onSubmit={e=> onsubmit(e)}>
                    <div className="form-group">
                        <label>User Name</label>
                        <input type="text" 
                            className="form-control"   
                            placeholder="User Name"
                            value={username}
                            onChange={e => setUsername(e.target.value)} required/>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label>First Name</label>
                            <input type="text" 
                                className="form-control"   
                                placeholder="First Name"
                                value={first_name}
                                onChange={e => setFirstName(e.target.value)} required/>
                        </div>
                        <div className="form-group col-md-6">
                            <label>Last Name</label>
                            <input type="text" 
                                className="form-control"   
                                placeholder="Last Name"
                                value={last_name}
                                onChange={e => setLastName(e.target.value)} required/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input type="text" 
                            className="form-control"   
                            placeholder="Example ! temp@temp.com..."
                            value={email}
                            onChange={e => setEmail(e.target.value)} required/>
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" 
                            className="form-control" 
                            placeholder="Enter Password" 
                            autoComplete="false"
                            value={password}  
                            onChange={e => setPassword(e.target.value)} 
                            disabled={!changePassword} required/>
                    </div>
                    
                    {changePassword 
                    ? (<div className="form-group ">
                        <label>Confirm-Password</label>
                        <input type="password" 
                            className="form-control" 
                            placeholder="Confirm Password" 
                            autoComplete="false"
                            value={confirmPassword}  
                            onChange={e => setconfirmPassword(e.target.value)} required/>
                    </div>)
                    : <button className="btn text-center" onClick = {() => setChangePassword(!changePassword)}>Click Here To Change Password</button>}
                    <div className="form-row">
                        <div className="form-group col-md-6 text-center ">
                            <button type="submit" className="btn btn-block btn-warning ">Update Profile</button>
                        </div>
                        <div className = "form-group col-md-6">
                            <Link to="/" className="btn btn-block btn-danger ">Go Back</Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </Fragment>

}

export default Profile