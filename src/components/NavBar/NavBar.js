import React from 'react'
import {Link} from 'react-router-dom'
import SignInBar from './SignInBar'
import SignOutBar from './SignOutBar'
import {connect} from 'react-redux';


const NavBar = (props) =>{
    const {auth} = props
    const links = auth.uid ? <SignInBar /> : <SignOutBar/>
    return(
        <nav className="nav-wrapper purple darken-3">
            <div className="container">
                <Link to="/" className="brand-logo">Hey</Link>
                {links}
            </div>
        </nav>
    )
}

const mapStateToProps = (state) =>{
    return{
        auth: state.firebase.auth
    }
}

export default connect(mapStateToProps)(NavBar)