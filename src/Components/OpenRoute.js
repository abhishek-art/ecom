import React from 'react'
import {Redirect, Route} from 'react-router-dom'
import {useSelector} from 'react-redux'

function OpenRoute ({component, ...rest}) {
    var Com = component
    const authenticated = useSelector(state => state.user.authenticated)
    const Component = () => {
        if(authenticated){
           return <Redirect to='/' />
        }
        else{
           return <Com />
        }
    }
    return (<Route {...rest}>
        {Component}
    </Route>
    )
}

export default OpenRoute