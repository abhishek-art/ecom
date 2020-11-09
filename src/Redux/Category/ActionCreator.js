import * as ActionTypes from './ActionTypes'
import {baseURL} from '../../baseURL'

export const categorySuccess = (category) => {
    return {
        type: ActionTypes.CATEGORY_SUCCESS,
        payload: {...category}
    }
}

export const categoryFailed = (err) => {
    return {
        type: ActionTypes.CATEGORY_FAILED,
        payload: err.message
    }
}

export const categoryLoading = () => {
    return {
        type: ActionTypes.CATEGORY_LOADING
    }
}

export const fetchCategories = () => {
    return (dispatch) => {
        dispatch(categoryLoading())
        return fetch(baseURL + 'category')
        .then(res=> {
            if(res.ok){
                return res
            }
            else{
                var error = new Error('Error '+res.status + ':' + res.statusText)
                error.response = res
                throw error
            }
        },
            error => {
                throw error
            })
        .then(res=> res.json())
        .then(res=> {
            dispatch(categorySuccess(res))
        })
        .catch(err=> dispatch(categoryFailed(err)))
    }
}