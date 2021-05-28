import React, { Component } from 'react'

export default class Filter extends Component {

    render() {
        return (
            <div className='filter'>
                <div className = 'filter-results'>
                    Total items: {this.props.count}
                </div>
                <div className = 'filter-type'>
                    Filter By:
                    <select value={this.props.type} onChange={this.props.filterProducts} >
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
    }
}

