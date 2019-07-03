import React, { Component } from 'react';
import {connect} from 'react-redux';
import {loginUser} from '../redux/actions/userAction'
import PropTypes from 'prop-types';
import {Redirect} from 'react-router-dom';



class Login extends Component {
    constructor(props){
        super(props)
        this.state ={
            email: "",
            password: "",
            errors: {}
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentWillReceiveProps(nextProps){
        if (nextProps.UI.errors){
            this.setState({
                errors: nextProps.UI.errors
            })
        }
    }
    
    handleChange = (e) => {
        this.setState({
            [e.target.id] : e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const userData = {
            email: this.state.email,
            password: this.state.password
        }
        this.props.loginUser(userData, this.props.history)
    }

    render() {
        // const {authError, auth} = this.props;
        // if(auth.uid) return <Redirect to='/dashboard'/>
        const {classes, UI: {loading}} = this.props
        return (
            <div className="container" id="login-form">
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
                            {/* { authError ? <p>{authError}</p> : null} */}
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

Login.propTypes ={
    // classes: PropTypes.object.isRequired,
    loginUser: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
    return{
        user: state.user,
        UI: state.UI
    }
}

const mapActionsToProps = {
   loginUser
}

export default connect(mapStateToProps, mapActionsToProps)(Login)



