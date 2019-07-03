const initialState ={
    authenticated: false,
    loading: false,
    credentials: {},
    viewer: [],
    notification : []
};

export default function(state = initialState, action){
    switch(action.type){
        case "SET_AUTHENTICATED":
            return {
                ...state,
                authenticated: true
            };
        case "SET_UNAUTHENTICATED":
            return initialState;
        case "SET_USER":
            return {
                authenticated: true,
                loading: false,
                ...action.payload
            };
        case "LOADING_USER":
            return {
                ...state,
                loading: true
            }
        case "VIEWER_VID_FEED":
            return{
                ...state,
                viewer: [
                    ...state.viewer,
                    {
                        userHandle: state.credentials.handle,
                        vidFeedId: action.payload.vidFeedId
                    }
                ]
            }
        default:
            return state
    }
}