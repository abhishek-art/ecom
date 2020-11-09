import { createStore, applyMiddleware, combineReducers} from 'redux'
import thunk from 'redux-thunk'
import {User} from './User/User'
import {Category} from './Category/Category'

export const ConfigStore = () => {

    const store = createStore(
        combineReducers({
            user: User,
            category: Category
        }), applyMiddleware(thunk))

    return store
}