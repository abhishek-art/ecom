import * as ActionTypes from './ActionTypes'
import {baseURL} from '../../baseURL'

// FETCHING CATEGORY

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

//  ADDING CATEGORY

export const addCategoryLoading = () =>{
    return {
        type: ActionTypes.ADD_CATEGORY_LOADING
    }
}

export const addCategoryFailed = (errMess) => {
    return {
        type: ActionTypes.ADD_CATEGORY_FAILED,
        payload: errMess
    }
}

export const addCategory = (category, token) => (dispatch) =>{
    dispatch(addCategoryLoading())
    return fetch(baseURL + 'category', {
        method: 'POST',
        body: category,
        headers: {
            //'Content-Type': 'multipart/form-data',
            'Authorization': `bearer ${token}`
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
    .then(res => {dispatch(fetchCategories())
                console.log('Category added successfully', res)})
    .catch(err => dispatch(addCategoryFailed(err.message)))
}