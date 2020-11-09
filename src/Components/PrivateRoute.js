import React from 'react'
import {Route, Redirect} from 'react-router-dom'
import { useSelector } from 'react-redux'

function PrivateRoute ({component, ...rest}) {

    const authenticated = useSelector(state => state.user.authenticated)
    
    const Comp = component
    const Component = () => {
        if(authenticated){
            return <Comp />
        }
        else{
            return <Redirect to='/signin' />
    }
    }
    return (
        <Route {...rest}>
            {Component}
        </Route>
    )
}

export default PrivateRoute