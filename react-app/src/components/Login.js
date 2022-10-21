import React, { Component } from 'react';


export default class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            show: false
        }
        this.openModalLogin = this.openModalLogin.bind(this);
        this.closeModalLogin = this.openModalLogin.bind(this);
    }

    openModalLogin = () => {
        this.setState({show: true})
    }
    closeModalLogin = () => {
        this.setState({show: false})
    }

    render() {

        return (
            { }
            
        )
    }
}
