import React, { Component } from 'react';
import {connect} from "react-redux";
import {register} from "../redux/actions/authAction"

class Register extends Component {
    constructor(props){
        super(props)
        this.state ={
            email: "",
            password:'',
            firstName:'',
            lastName: '',
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id] : e.target.value
        })
    }

    handleSubmit = (e) =>{
        e.preventDefault();
        this.props.register(this.state)
    }

    render() {
        const {authError} = this.props
        return (
            <div className='container'>
                <form onSubmit={this.handleSubmit} className='white'>
                    <h5 className='grey-text text darken-3'>Register</h5>
                    <div className='input-field'>
                        <label htmlFor='email'>Email</label>
                        <input type='email' id="email" onChange={this.handleChange}/>
                    </div>
                    <div className='input-field'>
                        <label htmlFor="password">Password</label>
                        <input type="password" id='password' onChange={this.handleChange}/>
                    </div>
                    <div className='input-field'>
                        <label htmlFor="firstName">First Name</label>
                        <input type="text" id="firstName" onChange={this.handleChange}/>
                    </div>
                    <div className='input-field'>
                        <label htmlFor="lastName">Last Name</label>
                        <input type='text' id='lastName' onChange={this.handleChange}/>
                    </div>
                    <div className= "input-field">
                        <button className="btn purple lighten 1 z-depth-0">Register</button>
                        <div className="red-text center">
                            { authError ? <p>{authError}</p> : null}
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        auth: state.firebase.auth,
        authError: state.auth.authError
    }
}

const mapDispatchToProps = (dispatch) =>{
    return {
        register: (newUser) => dispatch(register(newUser))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register)
