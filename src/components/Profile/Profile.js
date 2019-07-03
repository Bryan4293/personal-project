import React, { Component } from 'react'
import PropTypes from 'props-types'
import { connect } from 'react-redux'
import { Paper } from '@material-ui/core';
import classes from '*.module.css';
import {Link} from 'react-router-dom';
import MuiLink from '@material-ui/core/Link'

class Profile extends Component {
    
    render() {

        const { user: {credentials: {handle, createAt, imageUrl, bio, website}, loading}} = this.props

        let profileMarkup = !loading ? (authenticated ? (
        <Paper className={classes.paper}>
            <div className={classes.profile}>
                <div className="profile-image">
                    <img src={imageUrl} alt='profile'/>
                </div>
                
            </div>
        </Paper>) :(<p></p>)) : (<p>loading...</p>)
        return profileMarkup;
    }
}

const mapStateToProps =(state) =>({
    user:state.user
});

Profile.propTypes ={
    user: PropTypes.object.isRequired,
}

export default connect(mapStateToProps)(Profile)
