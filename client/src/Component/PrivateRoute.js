import React, { Fragment } from 'react'
import { useSelector } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'

const PrivateRoute = ({Component, path, ...rest}) => {
    const isLogin = useSelector(state => state.User.isLogin)
    return <Fragment>
        {!isLogin
        ? (<Redirect to="/login" />)
        : <Route {...rest} path={path} render={Component} />
        }
    </Fragment>
}
export default PrivateRoute