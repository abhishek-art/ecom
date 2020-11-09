import * as ActionTypes from './ActionTypes'
import {baseURL} from '../../baseURL'

export const loginSuccess = (user) => {
    return {
        type: ActionTypes.LOGIN_SUCCESS,
        payload: {...user}
    }
}

export const loginRequest = () => {
    return {
        type: ActionTypes.LOGIN_REQUEST
    }
}

export const loginFailure = (err) => {
    return {
        type: ActionTypes.LOGIN_FAILURE,
        payload: err.message
    }
}

export const Login = (user) => (dispatch) => {

    dispatch(loginRequest())
    return fetch(baseURL + 'api/signin', {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if(response.ok){
            return response
        }
        else{
            var error = new Error('Error ' + response.status + ':'+response.statusText)
            error.response = response
            throw error
        }
    },
    error => {
        throw error
    })
    .then(res => res.json())
    .then(res=> {console.log(res)
        localStorage.setItem('token', res.token)
        localStorage.setItem('user', JSON.stringify(res.user))
        dispatch(loginSuccess(res))})
    .catch(err=> {console.log(err.message)
                dispatch(loginFailure(err))})
}

export const logoutUser =() =>{
    return {
        type: ActionTypes.LOGOUT_USER
    }
}

export const signupUser = (user) => (dispatch) => {
    return fetch(baseURL + 'api/signup',{
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if(response.ok){
            return response
        }
        else{
            var error = new Error('Error ' + response.status + ':'+response.statusText)
            error.response = response
            throw error
        }
    },
    error => {
        throw error
    })
    .then(res => res.json())
    .then(res => {
        console.log(res)
    })
    .catch(err=> console.log(err))
}