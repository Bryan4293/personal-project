import React from 'react'
import {Link} from 'react-router-dom'
import SignInBar from './SignInBar'
import SignOutBar from './SignOutBar'
import {connect} from 'react-redux';


const NavBar = (props) =>{
    const {auth, profile} = props
    const links = auth.uid ? <SignInBar profile={profile}/> : <SignOutBar/>
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
    console.log(state)
    return{
        auth: state.firebase.auth,
        profile: state.firebase.profile
    }
}

export default connect(mapStateToProps)(NavBar)