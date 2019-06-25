import React from 'react';
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux';
import {logOut} from '../redux/actions/authAction';

const SignInBar = (props) =>{
    return (
        <ul className="right">
            <li><NavLink to="/dashboard">Dashboard</NavLink></li>
            <li><NavLink to="/video">Video Producer</NavLink></li>
            <li><a onClick={props.logOut}>Log Out</a></li>
            <li><NavLink to="/" className="btn btn-floating blue lighten-1" >{props.profile.initials}</NavLink></li>
        </ul>
    )
}

const mapDispatchToProps = (dispatch) => {
    return{
        logOut: () => dispatch(logOut())
    }
}

export default connect(null, mapDispatchToProps)(SignInBar)