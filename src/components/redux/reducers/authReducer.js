
const initialState={
    authError:null
}


export default function authReducer(state=initialState, action) {
    switch(action.type){
        case 'LOGIN_ERROR':
            return {
                ...state,
                authError: 'Login failed'
            }
        case 'LOGIN_SUCCESS':
            return {
                ...state,
                authError:null
            }
        case "LOGOUT_SUCCESS":
            console.log('logout success')
            return state;
        case 'REGISTER_SUCCESS':
            console.log('register success')
            return{
                ...state,
                authError: null
            }
        case 'REGISTER_ERROR':
            console.log('register error')
            return{
                ...state,
                authError: action.err.message
            }
        default:
            return state;
    }
}
