import React,{useState,useEffect} from 'react';
import {HashRouter as Router, Route} from 'react-router-dom';
import Login from "./routes/Login";
import Signup from "./routes/Signup";
import axios from "axios";

function App(){
    return (
      <Router>
        <Route path="/Login" component={Login}></Route>
        <Route path="/Signup" component={Signup}></Route>
      </Router>
    );
}

export default App;