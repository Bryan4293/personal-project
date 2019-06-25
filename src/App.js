import React from 'react';
import NavBar from './components/NavBar/NavBar';
import {Switch, Route} from "react-router-dom";
import Login from "./components/Auth/Login";
import Register from './components/Auth/Register';
import Dashboard from './components/Dashboard/Dashboard'
import VideoProducer from './components/VideoProducer/VideoProducer'

function App() {
  return (
    <div >
      <NavBar />
      <Switch>
        <Route path ="/Login" component={Login} />
        <Route path ='/Register' component={Register}/>
        <Route exact path = '/Dashboard' component ={Dashboard} />
        <Route exact path='/Video' component={VideoProducer}/>
      </Switch>
    </div>
  );
}

export default App;
