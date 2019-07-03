import React from 'react'
import {Link} from 'react-router-dom'
import SignInBar from './SignInBar'
import SignOutBar from './SignOutBar'
import {connect} from 'react-redux';


const NavBar = (props) =>{
    const {auth, profile} = props
    return(
        <nav className="nav-wrapper purple darken-3">
            <div className="container">
                <Link to="/" className="brand-logo">Hey</Link>
                <SignInBar profile={profile}/>
                <SignOutBar/> 
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