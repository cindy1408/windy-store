import React, { Component } from 'react'
import formatCurrency from '../util';
//model needs a state to show model or hide model (hence require a constructor)
import Modal from 'react-modal';
import {connect} from 'react-redux';
import {fetchProducts} from '../actions/productActions';

class Products extends Component {
    constructor (props){
        super(props);
        this.state = {
            product: null
        }
    }
    componentDidMount() {
        this.props.fetchProducts();
    }

    openModal = (product) => {
        this.setState({product});
    }
    closeModal = () => {
        this.setState({product: null});
    }
    render() {
        const {product} = this.state;
        return (
            <div className='products'>
                {
                    !this.props.products ? <div>Loading...</div>: 
                (
                    <ul className='products-lists'>
                    {this.props.products.map(product => (
                        <li key={product.id}>
                            <div className='product'>
                                <a href={"/#" + product.id} onClick={() => this.openModal(product)}>
                                    <img src={product.image} alt='product-img'></img>
                                    <p><b>{product.title}</b></p>
                                </a>
                                <div className="product-price">
                                    <p>{formatCurrency(product.price)}</p>
                                    <button onClick={() => this.props.addToCart(product)}>Add To Cart</button>
                                </div>
                            </div>
                        </li>
                    ))}</ul>
                )}
                
                    {
                        product && (
                            <Modal isOpen={true} 
                                onRequestClose={this.closeModal} 
                                ariaHideApp={false} >
                                <div className='button'>
                                    <button className='close-modal' onClick={this.closeModal}>x</button>
                                </div>
                                    <div className='product-modal'>
                                        <img src={product.image} alt='product-img'></img>
                                        
                                        <div className='product-model-description'>
                                            <h1><b>{product.title}</b></h1>
                                            <p>{product.description}</p>
                                            <div className='materials-care'>
                                                <p>Material: Ceramic</p>
                                                <p>Holds: 11 oz</p>
                                                <p>Dishwasher and microwave proof</p>
                                            </div>
                                            <p><b>{formatCurrency(product.price)}</b></p>
                                            <button onClick={() => this.props.addToCart(product)}>Add To Cart</button>
                                        </div>
                                    </div>
                            </Modal>
                        )
                    }
            </div>
        )
    }
}

export default connect((state) => ({products: state.products.items}), {fetchProducts})(Products)