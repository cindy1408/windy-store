import React, { Component } from 'react';
import { connect } from 'react-redux';
import { filterProducts }  from '../actions/productActions'

class Filter extends Component {
    render() {
        console.log(this.props.filterProducts.length)
        return ( !this.props.filterProducts ? <div>Loading...</div>: 
                (
                <div className='filter'>
                <div className = 'filter-results'>
                    Total items: {this.props.filterProducts.length}
                </div>
                <div className = 'filter-type'>
                    Filter By:
                    <select value={this.props.type} 
                        onChange={(e) => 
                            this.props.filterProducts(this.props.products, e.target.value)
                        } >
                        <option value="">ALL</option>
                        <option value="starter">Starter</option>
                        <option value="gen-I">Gen I</option>
                        <option value="gen-II">Gen II</option>
                        <option value="gen-III">Gen III</option>
                        <option value="gen-IV">Gen IV</option>
                        <option value="gen-V">Gen V</option>
                        <option value="gen-VI">Gen VI</option>
                        <option value="gen-VII">Gen VII</option>
                        <option value="gen-VIII">Gen VIII</option>
                    </select>
                </div>
            </div>
            )
        )
    }
}


export default connect(
    (state) => ({
        type: state.products.type,
        products: state.products.items,
        filterProducts: state.products.filteredItems
    }), 
    {
        filterProducts,
    }
    )(Filter)
 