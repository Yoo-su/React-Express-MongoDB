import React from 'react';
import {HashRouter as Router, Route} from 'react-router-dom';
import Login from "./Routes/Login";
import Signup from "./Routes/Signup";
import Home from "./Routes/SearchBooks";
import Pocket from "./Routes/Pocket"

function App(){
    return (
      <Router>
        <Route path="/" exact={true} component={Home}></Route>
        <Route path="/Mybooks" exact={true} component={Pocket}></Route>
        <Route path="/Login" component={Login}></Route>
        <Route path="/Signup" component={Signup}></Route>
      </Router>
    );
}

export default App;