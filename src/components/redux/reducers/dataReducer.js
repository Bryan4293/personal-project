const initialState ={
    vidFeeds: [],
    vidFeed: {},
    loading: false
};


export default function(state = initialState, action){
    switch(action.type){
        case 'LOADING_DATA':
            return{
                ...state,
                loading: true
            }
        case 'SET_VID_FEEDS':
            return{
                ...state,
                vidFeeds: action.payload,
                loading: false
            }
        case "VIEWER_VID_FEED":
            let index = state.vidFeeds.findIndex((vidFeed) => vidFeed.vidFeedId === action.payload.vidFeedId);
            state.vidFeeds[index] = action.payload;
            return{
                ...state
            }
        case "DELETE_VID_FEED":
            index = state.vidFeeds.findIndex(vidFeed => vidFeed.vidFeedId === action.payload);
            state.vidFeeds.splice(index,1);
            return{
                ...state
            }
        case "POST_VID_FEED":
            return{
                ...state,
                vidFeeds : [
                    action.payload,
                    ...state.vidFeeds
                ]
            }
        default:
            return state
    }
}