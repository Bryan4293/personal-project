import React from 'react'
import {Link} from 'react-router-dom'
import SignInBar from './SignInBar'
import SignOutBar from './SignOutBar'



const NavBar = () =>{
    return(
        <nav className="nav-wrapper purple darken-3">
            <div className="container">
                <Link to="/" className="brand-logo">Hey</Link>
                <SignInBar/>
                <SignOutBar/>
            </div>
        </nav>
    )
}

export default NavBar