import React,{useState,useEffect} from 'react';
import {HashRouter as Router, Route} from 'react-router-dom';
import Login from "./Routes/Login";
import Signup from "./Routes/Signup";
import Home from "./Routes/SearchBooks";

function App(){
    return (
      <Router>
        <Route path="/" component={Home}></Route>
        <Route path="/Login" component={Login}></Route>
        <Route path="/Signup" component={Signup}></Route>
      </Router>
    );
}

export default App;