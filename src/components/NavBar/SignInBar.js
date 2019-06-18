import React from 'react'
import {NavLink} from 'react-router-dom'

const SignInBar = () =>{
    return (
        <ul className="right">
            <li><NavLink to="/">Video Producer</NavLink></li>
            <li><NavLink to="/">Log Out</NavLink></li>
            <li><NavLink to="/" className="btn btn-floating blue lighten-1" >BB</NavLink></li>
        </ul>
    )
}
export default SignInBar