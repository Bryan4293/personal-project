import React, { Component } from 'react'
import {connect} from 'react-redux'
import {compose} from 'redux'
import {Redirect} from 'react-router-dom'
import axios from 'axios';
import PropTypes from 'prop-types'

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

import VidFeed from './VidFeed'
import {uploadVideo} from '../redux/actions/userAction'
import {getAllVidFeeds} from '../redux/actions/dataAction'

class VideoProducer extends Component {
    
    componentDidMount(){
    this.props.getAllVidFeeds()
    }
    handleVideoChange = (e) =>{
        const video = e.target.files[0]
        const formData = new FormData();
        formData.append('video', video, video.name)
        this.props.uploadVideo(formData)
    }
    render() {
        const {vidFeeds, loading} = this.props.data
        // const{auth} =this.props;
        // if(!auth.uid) return <Redirect to='/login'/>
        let vidFeedMark = !loading ? (
            vidFeeds.map(vidFeed => <VidFeed key={vidFeed.vidFeedId} vidFeed={vidFeed}/>) 
        ) : <p>Loading...</p>
        return (
            <Container fixed id="producer">
                <div>
                <input type="file" id="videoInput" onChange={this.handleVideoChange}></input>
                </div>
                <Grid item sm={8} xs={12}>
                    {vidFeedMark}
                </Grid>
            </Container>
            
        )
    }
}

VideoProducer.propTypes ={
    getAllVidFeeds:PropTypes.func.isRequired,
    data: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    user: state.user,
    data: state.data
})

const mapActionsToProps ={
    uploadVideo,
    getAllVidFeeds
}
export default connect(mapStateToProps, mapActionsToProps)(VideoProducer)
