import { FETCH_PRODUCTS, FILTER_PRODUCTS_BY_TYPES } from "../types";

export const productsReducer = (state = {}, action ) => {
    switch(action.type){
        case FILTER_PRODUCTS_BY_TYPES:
            return {
                ...state,
                type: action.payload.type,
                filteredItems: action.payload.items,
            }
        case FETCH_PRODUCTS:
            return {items: action.payload, filteredItems: action.payload};
        
        default: 
            return state;
    }
} 