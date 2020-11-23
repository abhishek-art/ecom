import * as ActionTypes from './ActionTypes'

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

export const fetchProducts = () => (dispatch) => {
    dispatch(productsLoading())
    return fetch()
}