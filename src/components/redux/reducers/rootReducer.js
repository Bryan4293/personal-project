import authReducer from './authReducer';
import {combineReducers} from "redux";
import {firestoreReducer} from 'redux-firestore';
import {firebaseReducer} from 'react-redux-firebase';
import userReducer from './userReducer'
import dataReducer from './dataReducer'
import uiReducer from './uiReducer' 


const rootReducer = combineReducers({
    auth: authReducer,
    firestore: firestoreReducer,
    firebase: firebaseReducer,
    user: userReducer,
    data: dataReducer,
    UI: uiReducer
});

export default rootReducer