import * as ActionTypes from './ActionTypes'

const initialState = {
    categories: [],
    loading: true,
    errMess: null
}

export const Category = (state = initialState,action)=> {
    switch(action.type){
        case ActionTypes.CATEGORY_LOADING:
            return initialState 
        case ActionTypes.CATEGORY_SUCCESS:
            return {
                ...initialState, loading: false, categories: action.payload
            }
        case ActionTypes.CATEGORY_FAILED:
            return {
                ...initialState, loading: false, errMess: action.payload
            }
        default:
            return state
    }
}