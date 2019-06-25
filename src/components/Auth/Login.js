import React, { Component } from 'react';
import {connect} from 'react-redux';
import {login} from '../redux/actions/authAction'
import {Redirect} from 'react-router-dom'

class Login extends Component {
    constructor(props){
        super(props)
        this.state ={
            email: "",
            password: ""
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    
    handleChange = (e) => {
        this.setState({
            [e.target.id] : e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.login(this.state)
    }

    render() {
        const {authError, auth} = this.props;
        if(auth.uid) return <Redirect to='/dashboard'/>
        return (
            <div className="container">
                <form onSubmit={this.handleSubmit} className="white">
                    <h5 className="grey-text text darken-3">Log in</h5>
                    <div className="input-field">
                        <label htmlFor="email">Email</label>
                        <input type="email" id='email' onChange={this.handleChange}/>
                    </div>
                    <div className="input-field">
                        <label htmlFor="password">Password</label>
                        <input type="password" id='password' onChange={this.handleChange}/>
                    </div>
                    <div className='input-field'>
                        <button className="btn purple lighten 1 z-depth-0">Login</button>
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
        authError: state.auth.authError,
        auth: state.firebase.auth
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        login : (cred) => dispatch(login(cred))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)



