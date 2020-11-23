import * as ActionTypes from './ActionTypes'

const initialState = {
    products: [],
    loading: true,
    errMess: null
}

export const Products = (state = initialState, action) => {
    switch(action.type){
        case ActionTypes.PRODUCTS_FAILED:
            return {
                ...initialState, loading: false, errMess: action.payload
            }
        case ActionTypes.PRODUCTS_LOADING:
            return initialState
        case ActionTypes.PRODUCTS_SUCCESS:
            return {
                ...initialState, loading: false, products: action.payload
            }
        default:
            return state
    }
}