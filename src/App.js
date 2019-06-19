import React from 'react';
import NavBar from './components/NavBar/NavBar';
import {Switch, Route} from "react-router-dom";
import Login from "./components/Auth/Login";
import Register from './components/Auth/Register';

function App() {
  return (
    <div >
      <NavBar />
      <Switch>
        <Route path ="/Login" component={Login} />
        <Route path ='/Register' component={Register}/>
      </Switch>
    </div>
  );
}

export default App;
