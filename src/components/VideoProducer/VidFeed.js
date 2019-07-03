import React, { Component } from 'react';

import withStyles from '@material-ui/core/styles/withStyles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

import {Link} from 'react-router-dom';
import dayJs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime'
import {connect} from 'react-redux';
import {viewerVidFeed} from "../redux/actions/dataAction"
import DeleteVidFeed from './DeleteVidFeed'

import PropTypes from 'prop-types'



const styles = {
    card:{
        display: "flex",
        marginBottom: 20,
    },
    video:{
        minWidth: 200,
        maxHeight: 400,
    },
    content:{
        padding: 15,
        objectFit: 'cover'
    }
}

class VidFeed extends Component {
    viewerVidFeed= () =>{
        if(this.props.user.viewer && this.props.user.viewer.find(viewer => viewer.vidFeedId === this.props.vidFeed.vidFeedId))
        return true;
        else return false;
    }
    viewerVidFeed =() =>{
        this.props.viewerVidFeed(this.props.vidFeed.vidFeedId);
    }
    render() {
        dayJs.extend(relativeTime)
        const {classes, vidFeed : { body, createAt, userVideo, userHandle, vidFeedId, viewerCount, commentCount}, user:{ authenticated, credentials: {handle}} } =this.props
        const deleteButton = authenticated && userHandle === handle ? (
            <DeleteVidFeed vidFeedId={vidFeedId}/>
        ) : null
        return (
            <Card className={classes.card}>
                <CardMedia src={userVideo} component="video" title="Video" className={classes.video}/>
                <CardContent className={classes.content}>
                    <Typography variant="h5" component={Link} to={`/users/${userHandle}`}>{userHandle}</Typography>
                    <Typography variant="body2" color="textSecondary">{dayJs(createAt).fromNow()}</Typography>
                    <Typography variant="body1">{body}</Typography>
                    <span>{viewerCount} Viewers</span>
                    {deleteButton}
                </CardContent>
            </Card>
        )
    }
}

VidFeed.propTypes={
    viewerVidFeed: PropTypes.func.isRequired,
    user:PropTypes.object.isRequired,
    vidFeed: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
}

const mapStateToProps= state => ({
    user: state.user
})

const mapActionToProps ={
    viewerVidFeed
}

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(VidFeed))
