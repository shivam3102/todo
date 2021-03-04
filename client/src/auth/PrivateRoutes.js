import React from 'react'
import { isAuthenticate } from './index'
import { Redirect, Route } from 'react-router-dom'

const PrivateRoutes = ({ component: Component, ...rest }) => {
    return (
        <Route
            {...rest}
            render={props => isAuthenticate() ? (
                <Component {...props} />
            )
                : (
                    <Redirect to={{ pathname: '/signin', state: { from: props.location } }} />
                )}
        />
    )
}

export default PrivateRoutes
