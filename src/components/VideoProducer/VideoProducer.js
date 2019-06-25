import React, { Component } from 'react'
import {connect} from 'react-redux'
import {compose} from 'redux'
import {Redirect} from 'react-router-dom'

class VideoProducer extends Component {
    render() {
        const{auth} =this.props;
        if(!auth.uid) return <Redirect to='/login'/>
        return (
            <div>
                <iframe
                    src="https://clips.twitch.tv/embed?clip=IncredulousAbstemiousFennelImGlitch"
                    height="360"
                    width="640"
                    frameborder="0"
                    scrolling="no"
                    allowFullScreen="true">
                </iframe>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        auth: state.firebase.auth
    }
}
export default compose(connect(mapStateToProps))(VideoProducer)
