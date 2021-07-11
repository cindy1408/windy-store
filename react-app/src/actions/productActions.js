//import { indexOf } from "core-js/core/array";
import { FETCH_PRODUCTS, FILTER_PRODUCTS_BY_TYPES } from "../types";

export const fetchProducts = () => async (dispatch) => {
    const res = await fetch("/api/products");
    const data = await res.json();
    console.log(data);
    dispatch({
        type: FETCH_PRODUCTS,
        payload: data,
    })
}

//add filter products by types (actions)
//accepts 2 parameters, 1st accepts all products from server, second is the filter by.
export const filterProducts = (products, type) => (dispatch) => {
    //dispatches an action that changes the redux store
    dispatch({
        type: FILTER_PRODUCTS_BY_TYPES,
        payload: {
            //the selected option
            type: type,
            //based on the option selected
            items: 
                type === "" 
                    ? products 
                    : products.filter(x=> x.type[0] === type)
        }
    })
}