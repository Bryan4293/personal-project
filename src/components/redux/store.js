import {createStore, applyMiddleware, compose} from 'redux';
import rootReducer from './reducers/rootReducer';
import thunk from 'redux-thunk';
import {getFirebase, reactReduxFirebase} from 'react-redux-firebase';
import fb from '../../config/Firebase'

export default createStore(rootReducer,
    compose(
    applyMiddleware(thunk.withExtraArgument({getFirebase})),
    reactReduxFirebase(fb)
    )
);