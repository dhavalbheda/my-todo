import React, { Fragment } from 'react'

const Alert = ({alert}) => {
    return <Fragment>
        <div className={`alert alert-${alert.type} alert-dismissible fade show mt-3`} role="alert">
            <strong>{alert.message} !</strong>
        </div>
    </Fragment> 
}

export default Alert