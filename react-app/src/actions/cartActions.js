import { ADD_TO_CART, REMOVE_FROM_CART } from "../types";

//current item in the cart and product that we are going to add to the cart
export const addToCart = (items, products) => (dispatch) => {
    //creating an item clone 
    const cartItems = items.slice();
    //check whether the product is already in the cart or not. 
    let alreadyExists = false;
    cartItems.forEach( x => {
        if(x._id === products._id){
            alreadyExists = true;
            x.count++;
        }
    });
    if(!alreadyExists){
        cartItems.push({...products, count: 1})
    }
    dispatch({
        type: ADD_TO_CART, 
        payload: {cartItems}
    });
//update the local store storage based on the new cartItems
    localStorage.setItem("cartItems", JSON.stringify(cartItems))
}



//Remove from Cart Action 
export const removeFromCart = (items, products) => (dispatch) => {
    const cartItems = items.slice().filter(
        x => x._id !== products._id
    )
    dispatch({
        type: REMOVE_FROM_CART,
        payload: {cartItems}
    })
    localStorage.setItems(JSON.stringify(cartItems))
}