import React, { Component } from 'react';
import 'semantic-ui-css/semantic.min.css';
import Modal from 'react-modal'; 
import formatCurrency from '../util';
import StripeCheckout from 'react-stripe-checkout';
import loginAction from '../actions/loginActions';

export default class Nav extends Component {
    constructor(props){
        super(props);
        this.state = {
            aboutUs: null,
            checkout: null,
            account: false,
            login: false,  
            registration: false, 
            showCheckout: false,
            name: "Cindy", 
            email: "",
            password: "",
            confirmPassword: "",
            address: "",
            address2: "",
            address3: "",
            isValid: false,
        }

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange = e => {
        this.setState({[e.target.name]: e.target.value})
    };

    handleSubmit = e => {
        e.preventDefault();
        if(this.state.password !== this.state.confirmPassword){
            this.setState({isValid: false})
            console.log("Password must match!")
        } else {
        const data = this.state; 
        this.setState({isValid: true})
        console.log(data)
        }
    }

    /* Modal for either login OR sign up page */
    openModalAccount = () => {
        this.setState({account: true})
    }

    closeModalAccount = () => {
        this.setState({account: false})
    }
    /* Modal for Login page */
    openModalLogin = () => {
        this.setState({login: true})
    }

    closeModalLogin = () => {
        this.setState({login: false})
    }

    /* Modal for about page */
    openModalAbout = () => {
        this.setState({aboutUs: true})
    }
    closeModalAbout = () => {
        this.setState({aboutUs: false});
    }

    openModalCheckout = () => {
        this.setState({checkout: true})
    }
    openModalRegistration = () => {
        this.setState({registration: true})
    }    
    

    closeModalCheckout = () => {
        this.setState({checkout: false});
    }
    closeModalRegistration = () => {
        this.setState({registration: false})
    }  
    handleInput = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    createUser = (e) => {
        e.preventDefault();
        const user = {
            name: this.state.name,
            email: this.state.email, 
            password: this.state.password
        }
        this.props.createUser(user);
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

    closeModal = () => {
        this.props.clearOrder();
    }

    submitForm = async (event) => {
        this.setState({submitted: true});
        this.props.dispatch(loginAction.formSubmissionStatus(true));
    }

    render() {
        const { aboutUs, checkout, login, registration, account} = this.state;
        const {cartItems} = this.props;
        return (
            <div>
                <div className='nav'>
                <button onClick={() => this.openModalAbout({aboutUs})}>About Us</button> 
                <button onClick={() => this.openModalAccount({account})}>Login</button>
                
            
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

                {account && (
                    <Modal
                        isOpen={true}
                        onRequestClose={this.closeModalAccount}
                        ariaHideApp={false}>
                            <button className='close-modal' onClick={this.closeModalAccount}>x</button>
                            <button onClick={() => this.openModalRegistration({registration})}>Sign up</button>
                            <p>already have an account?</p>
                            <button onClick={() => this.openModalLogin({login})}>Sign in</button>

                    </Modal>
                )}

                {login && (
                    <Modal
                        isOpen={true} 
                        onRequestClose={this.closeModalLogin} 
                        ariaHideApp={false}>
                            <button className='close-modal' onClick={this.closeModalLogin}>x</button>
                            <label>Email Address: </label>
                            <input />
                            <label>Password: </label>
                            <input type='password'/>
                            <button>Login</button>


                    </Modal>
                )}
                
                {registration && (
                    <Modal
                        isOpen={true} 
                        onRequestClose={this.closeModalRegistration} 
                        ariaHideApp={false}>
                            <div className='button'>
                            <button className='close-modal' onClick={this.closeModalRegistration}>x</button>
                        </div>
                         <form>
                             <h3>Register with us!</h3>
                             <label>Name: </label>
                             <input onChange={this.handleChange} name='name' value={this.state.name}></input>
                             <label>Email: </label>
                             <input onChange={this.handleChange} name='email' value={this.state.email}></input>
                             <label>Password: </label>
                             <input onChange={this.handleChange} name='password'value={this.state.password}></input>
                             <label>re-enter Password: </label>
                             <input onChange={this.handleChange} name='confirmPassword' value={this.state.confirmPassword}></input>
                             <button onClick={this.createUser}>Submit</button>
                         </form>
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
                                        {/* <button className='checkout-button' onClick={() => {this.setState({showCheckout: true})}}>Checkout</button> */}
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
