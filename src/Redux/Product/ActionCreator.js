import * as ActionTypes from './ActionTypes'
import {baseURL} from '../../baseURL'

export const productsFailed = (err) =>({
    type: ActionTypes.PRODUCTS_FAILED,
    payload: err.message
})

export const productsSuccess = (products) => ({
    type: ActionTypes.PRODUCTS_SUCCESS,
    payload: products
})

export const productsLoading = () => ({
    type: ActionTypes.PRODUCTS_LOADING
})

export const fetchProducts = (token) => (dispatch) => {
    dispatch(productsLoading())
    return fetch(baseURL + 'product', {
        method: 'GET',
        headers: {
            'Authorization': `bearer ${token}`
        }
    })
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
        dispatch(productsSuccess(res))
    })
    .catch(err=> dispatch(productsFailed(err)))
}
