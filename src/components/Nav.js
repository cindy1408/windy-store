import React, { Component } from 'react';
import 'semantic-ui-css/semantic.min.css';
import Modal from 'react-modal'; 
import formatCurrency from '../util';

export default class Nav extends Component {
    constructor(props){
        super(props);
        this.state = {
            aboutUs: null,
            checkout: null,
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
    render() {
        const {aboutUs, checkout} = this.state;
        const {cartItems} = this.props;
        return (
            <div className='nav'>
                <button onClick={() => this.openModalAbout({aboutUs})}>About Us</button> 
                <a href='/'>Shop</a>
                <div className='checkout'>
                    <div className='item-number'>
                        {cartItems.length === 0 ? null : (
                          <p>{cartItems.reduce((a,c) => a + c.count, 0)}</p>)}   
                
                    </div>
                    <button onClick={() => this.openModalCheckout({checkout})}><i className="shopping basket icon"></i></button>
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
                            <h1>CHECKOUT</h1>
                            {cartItems.length === 0 ? 'Your cart is empty.' : (
                                <p>You have : {cartItems.reduce((a, c) => a + c.count, 0)} items</p>
                            )}
                            <div className='cart-modal'>
                                <ul className='cart-items'>
                                    {cartItems.map(item =>(
                                        <li key={item.id}>
                                            <div>
                                                <img src={item.image} alt={item.title}></img>
                                                <p>{item.title}</p>
                                            </div>
                                            <div>
                                                {formatCurrency(item.price)} x {item.count} {" "}
                                                <button onClick={() => this.props.removeFromCart(item)}>Remove</button>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                                <div className='checkout'>
                                    Total: {" "}
                                    {formatCurrency(
                                        cartItems.reduce((a, c) => a + c.price * c.count, 0)
                                    )}
                                    <button className='checkout'>Checkout</button>
                                </div>
                            </div>
                    </div>
                    
                    <div className='about-description-modal'>
                    </div>
                    </div>
                </Modal>
                )}
                    
                
            </div>
        )
    }
}
