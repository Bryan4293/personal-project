import axios from 'axios';

export const getAllVidFeeds =() => dispatch => {
    dispatch({ type: "LOADING_DATA"})
    axios.get('/VidFeeds')
        .then(res => {
            dispatch({
                type: "SET_VID_FEEDS",
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type: "SET_VID_FEEDS",
                payload:[]
            })
        })
}

export const postVidFeed = (newVidFeed) => (dispatch)=>{
    dispatch({ type: "LOADING_UI"})
    axios.post('/vidFeed', newVidFeed)
        .then(res =>{
            dispatch({
                type: "POST_VID_FEED",
                payload: res.data
            })
            dispatch({ type: "CLEAR_ERRORS"})
        })
        .catch(err =>{
            dispatch({
                type: "SET_ERRORS",
                payload: err.response.data
            })
        })
}

export const viewerVidFeed = (vidFeedId) => dispatch =>{
    axios.get(`/vidFeed/${vidFeedId}/viewer`)
        .then(res =>{
            dispatch({
                type: "VIEWER_VID_FEED",
                payload:res.data
            })
        })
        .catch(err => console.log(err))
}

export const deleteVidFeed = (vidFeedId) => (dispatch) =>{
    axios.delete(`/vidFeed/${vidFeedId}`)
        .then(()=>{
            dispatch({ type: "DELETE_VID_FEED", payload: vidFeedId})
        })
        .catch( err => console.log(err))
}