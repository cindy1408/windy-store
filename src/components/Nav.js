import React, { Component } from 'react';
import 'semantic-ui-css/semantic.min.css';
import Modal from 'react-modal'; 
import formatCurrency from '../util';
import StripeCheckout from 'react-stripe-checkout';
import { ItemDescription } from 'semantic-ui-react';

export default class Nav extends Component {
    constructor(props){
        super(props);
        this.state = {
            aboutUs: null,
            checkout: null,
            showCheckout: false,
            name: "", 
            email: "",
            address: "",
        }
    }
    openModalAbout = () => {
        this.setState({aboutUs: true})
    }
    openModalCheckout = () => {
        this.setState({checkout: true})
    }
    
    closeModalAbout = () => {
        this.setState({aboutUs: false});
    }
    closeModalCheckout = () => {
        this.setState({checkout: false});
    }
    handleInput = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }
    createOrder = (e) => {
        e.preventDefault();
        const order = {
            name: this.state.name,
            email: this.state.email,
            address: this.state.address,
            cartItems: this.state.cartItems,
        }
        this.props.createOrder(order);
    }
    render() {
        const {aboutUs, checkout} = this.state;
        const {cartItems} = this.props;
        let {totalPrice} = cartItems.reduce((a, c) => a + c.count, 0)
        return (
            <div>
            <div className='nav'>
                <button onClick={() => this.openModalAbout({aboutUs})}>About Us</button> 
                <button >Review</button>
                
            
                <div className='checkout-button'>
                    <button onClick={() => this.openModalCheckout({checkout})}><i className="shopping basket icon"></i></button>
                    <div className='item-number'>
                        {cartItems.length === 0 ? null : (
                          <p>{cartItems.reduce((a,c) => a + c.count, 0)}</p>)}   
                </div>
                
                </div>
            </div>
                               
                {aboutUs && (
                    <Modal 
                        isOpen={true} 
                        onRequestClose={this.closeModalAbout} 
                        ariaHideApp={false} >
                        <div className='button'>
                            <button className='close-modal' onClick={this.closeModalAbout}>x</button>
                        </div>
                        
                        <div className='about-modal'>
                            <div className='title-modal'>
                                <h1>The Windy Store</h1>
                                <img src='./images/aboutUs.jpg' alt='about-us'></img>
                            </div>
                    <div className='about-description-modal'>
                        <h2>Who are we?</h2><br></br>
                        <p>The name <b>Windy</b> came from our names combined, Will and Cindy. <br/> Our store started in London, when Will was playing with Pokemon's name. <br/> The first was Pikachu to SmikaSmu, then it was Lapras to LapAss, Bagon or Bagel and so on. <br/> We started seriously thinking about different ways we could sell these silly names, especially when it came to Pika-Poop! </p>
                    </div>
                    </div>
                </Modal>
                )}


                
                {checkout && (
                    <Modal 
                        isOpen={true} 
                        onRequestClose={this.closeModalCheckout} 
                        ariaHideApp={false}>
                        <div className='button'>
                            <button className='close-modal' onClick={this.closeModalCheckout}>x</button>
                        </div>
                        <div className='checkout-modal'>
                            <div className='title-modal'>
                                <div className='title-section'>
                                    <h1>CHECKOUT</h1>
                                </div>
                            {cartItems.length === 0 ? 'Your cart is empty.' : (
                                <p>You have : {cartItems.reduce((a, c) => a + c.count, 0)} items</p>
                            )}
                            <div className='cart-modal'>
                                <ul className='cart-items'>
                                    {cartItems.map(item =>(
                                        <li key={item.id}>
                                            <div className='each-product-section'>
                                                <div className='checkout-img'>
                                                    <img src={item.image} alt={item.title}></img>
                                                </div>
                                                
                                                <div className='cart-info'>
                                                    <div className='title'>
                                                        <p>{item.title}</p>
                                                    </div>
                                                    <div className='price'>
                                                        {formatCurrency(item.price)} x {item.count} {" "}
                                                    </div>
                                                    <div className='button'>
                                                        <button onClick={() => this.props.removeFromCart(item)}>Remove</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                                <div className='checkout'>
                                    <div className='total-price'>
                                        Total: {" "}
                                        {formatCurrency(
                                            cartItems.reduce((a, c) => a + c.price * c.count, 0)
                                        )}
                                        </div>
                                    
                                    <div>
                                        <button className='checkout-button' onClick={() => {this.setState({showCheckout: true})}}>Checkout</button>
                                        <StripeCheckout 
                                            stripeKey= "pk_test_51IzITeCp2VW1Fwcl5ecwGR5verXvz5LgYQGEj7neoGjvxH53VM35Oo9JD10KqDuroVY6jGWQ6zv2AKSNnQXgmJGd00NakSkEQ6"
                                            token = {this.props.handleToken}
                                            billingAddress
                                            shippingAddress
                                            amount={cartItems.reduce((a, c) => a + c.price * c.count, 0)*100}
                                            name={cartItems.title} />
                                    </div>
                                    <div className='checkout-info'>
                                    {this.state.showCheckout && (
                                            <form onSubmit={this.createOrder}>
                                                <ul className='form-container'>
                                                    <li>
                                                        <label>Name: </label>
                                                        <input type="name" required></input>
                                                    </li>
                                                    <li>
                                                        <label>Email: </label>
                                                        <input type="email" required onChange={this.handleInput}></input>
                                                    </li>
                                                    <li>
                                                        <label>Address: </label>
                                                        <input type="address" onChange={this.handleInput} required></input>
                                                    </li>
                                                    <button onClick={this.createOrder}>Pay</button>
                                                </ul>
                                                
                                            </form>
                    )}
                                    </div>
                                </div>
                            </div>
                    </div>
                    </div>
                    
                </Modal>
                )}              
            </div>
        )
    }
}
