import React, { Component } from 'react'
import {connect} from 'react-redux'
import {compose} from 'redux'
import {Redirect} from 'react-router-dom'


class Dashboard extends Component {
    render() {
        const{auth} =this.props;
        if(!auth.uid) return <Redirect to='/login'/>
        return (
            <div className="row">
                <iframe
                    src="https://player.twitch.tv/?channel=Brome8"
                    height="576"
                    width="1024"
                    frameBorder="0"
                    scrolling="no"
                    allowFullScreen={true}>
                </iframe>
                <iframe frameBorder="0"
                        scrolling="no"
                        id="chat_embed"
                        src="https://www.twitch.tv/embed/Brome8/chat"
                        height="500"
                        width="350">
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

export default compose(connect(mapStateToProps))(Dashboard)
