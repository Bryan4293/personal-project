import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux';
import {logOutUser} from '../redux/actions/userAction';

class SignInBar extends Component{
    handleLogout = () => {
        this.props.logOutUser();
    }
    render(){
    return (
        <ul className="right">
            <li><NavLink to="/dashboard">Dashboard</NavLink></li>
            <li><NavLink to="/video">Video Producer</NavLink></li>
            <li><a onClick={this.handleLogout}>Log Out</a></li>
            {/* <li><NavLink to="/" className="btn btn-floating blue lighten-1" >{props.profile.initials}</NavLink></li> */}
        </ul>
    )
}
}

const mapStateToProps =(state)=>({
    user: state.user  
})

const mapActionsToProps = {
    logOutUser
}

export default connect(mapStateToProps, mapActionsToProps)(SignInBar)