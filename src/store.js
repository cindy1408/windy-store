import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { orderReducer } from './reducers/orderReducers';
import { productsReducer } from './reducers/productReducers';
import { cartReducer } from './reducers/cartReducers';
import { loginReducer } from './reducers/loginReducers';

const initialState = {};
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    combineReducers({
    products: productsReducer,
    cart: cartReducer,
    order: orderReducer,
    login: loginReducer,
}), 
initialState, 
composeEnhancer(applyMiddleware(thunk))
);

export default store;