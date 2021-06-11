import React from 'react';
import Products from './components/Products';
import Filter from './components/Filter';
import Nav from './components/Nav';
import store from './store'
import { Provider } from 'react-redux';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      cartItems: localStorage.getItem("cartItems") 
      ?JSON.parse(localStorage.getItem("cartItems")) 
      : [],
      filterProducts: []
    }
  }

  addToCart = (product) => {
    const cartItems = this.state.cartItems.slice();
    let alreadyInCart = false; 
    cartItems.forEach(item => {   
      if(item.id === product.id) {
        item.count++;
        alreadyInCart = true;
        }
      });
      if(!alreadyInCart){
        cartItems.push({...product, count: 1});
      }
    this.setState({cartItems})
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  };

  removeFromCart = (item) => {
    const cartItems = this.state.cartItems.slice();
        this.setState({
          cartItems: cartItems.filter( x => x.id !== item.id ),
        })
        localStorage.setItem(
          "cartItems", 
          JSON.stringify(cartItems.filter( x => x.id !== item.id )));
  }


  createOrder = (order) => {
    alert("Need to save order for: " + order.name)
  };

  render () {
    console.log()
    return (
      <Provider store={ store }>
      <div className='grid-container'>
        <header>
          <h1>The Windy Store</h1>
          <Nav 
            cartItems={this.state.cartItems} 
            addToCart={this.addToCart}
            removeFromCart={this.removeFromCart}
            createOrder={this.createOrder} />
        </header>
        <main>
          <div className='content'>
            <Filter count={this.state.filterProducts.length} />
            <div className='main-content'>
              
              <Products addToCart={this.addToCart}
                        />
            </div>
          </div>
        </main>
        <footer>All right is reserved</footer>
      </div>
      </Provider>
    );
  }
};

export default App;
