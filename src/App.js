import React from 'react';
import NavBar from './components/NavBar/NavBar';
import {Switch, Route} from "react-router-dom";
import Login from "./components/Auth/Login";
import Register from './components/Auth/Register';
import Dashboard from './components/Dashboard/Dashboard'
import VideoProducer from './components/VideoProducer/VideoProducer'
import Landing from './components/Landing/Landing';
import "./App.css"

import {logOutUser, getUserData} from "./components/redux/actions/userAction"
import jwtDecode from 'jwt-decode';
import AuthRoute from './util/AuthRoute'
import { auth } from 'firebase';
import store from './components/redux/store';
import axios from 'axios'


const token = localStorage.FBIdToken;
if(token){
  const decodeToken = jwtDecode(token);
  if(decodeToken.exp * 1000 < Date.now()){
    store.dispatch(logOutUser())
    window.location.href = '/#/login'
  } else{
    store.dispatch({ type: "SET_AUTHENTICATED"})
    axios.defaults.headers.common['Authorization'] = token
    store.dispatch(getUserData())
  }
}

function App() {
  return (
    <div >
      <NavBar />
      <Switch>
        <Route exact path="/" component={Landing}/>
        <AuthRoute exact path ="/Login" component={Login}  />
        <AuthRoute exact path ='/Register' component={Register}  />
        <Route exact path = '/Dashboard' component ={Dashboard} />
        <Route exact path='/Video' component={VideoProducer}/>
      </Switch>
    </div>
  );
}

export default App;
