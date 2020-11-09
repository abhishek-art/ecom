import * as ActionTypes from './ActionTypes'

const initialState = {
    token: null,
    authenticated: false,
    authenticating: true,
    user: {
        firstname: '',
        lastname: '',
        email: '',
        role: '',
        username: ''
    },
    errMess: null
}

export const User = (state = initialState,action) => {
    switch(action.type){
        case ActionTypes.LOGIN_REQUEST:
            return state
        case ActionTypes.LOGIN_SUCCESS: 
            return {
                ...state, authenticating: false, authenticated: true,
                token: action.payload.token, user: action.payload.user, errMess: null
            }
        case ActionTypes.LOGIN_FAILURE: 
            return {
                ...initialState, errMess: action.payload, authenticating: false
            }
        case ActionTypes.LOGOUT_USER:
            return initialState
        default:
            return state
    }
}