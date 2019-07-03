import React, { Component } from 'react';
import {connect} from "react-redux";
import {registerUser} from "../redux/actions/userAction"
import {Redirect} from 'react-router-dom';
import PropTypes from 'prop-types';

class Register extends Component {
    constructor(props){
        super(props)
        this.state ={
            email: "",
            password:'',
            handle:'',
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
        this.setState({
            loading:true
        });
        const newUserData = {
            email: this.state.email,
            password: this.state.password,
            handle:this.state.handle
        }
        this.props.registerUser(newUserData, this.props.history)
    }

    render() {
        // const {authError, auth} = this.props
        // if(auth.uid) return <Redirect to='/dashboard'/>
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
                        <label htmlFor="handle">Username</label>
                        <input type="text" id='handle' onChange={this.handleChange}/>
                    </div>
                    {/* <div className='input-field'>
                        <label htmlFor="firstName">First Name</label>
                        <input type="text" id="firstName" onChange={this.handleChange}/>
                    </div>
                    <div className='input-field'>
                        <label htmlFor="lastName">Last Name</label>
                        <input type='text' id='lastName' onChange={this.handleChange}/>
                    </div> */}
                    <div className= "input-field">
                        <button className="btn purple lighten 1 z-depth-0">Register</button>
                        <div className="red-text center">
                            {/* { authError ? <p>{authError}</p> : null} */}
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

Register.propTypes ={
    user: PropTypes.object.isRequired,
    UI:PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
    return{
        user: state.user,
        UI: state.UI
    }
}



export default connect(mapStateToProps, {registerUser})(Register)
