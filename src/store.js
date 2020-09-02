import {} from "react-redux";
import { createSlice, configureStore } from "@reduxjs/toolkit";

const userstate=createSlice({
    name:"user",
    initialState:{
        isLogin:false,
        curUser:{},
    },
    reducers:{
        LogIn:(state,action)=>{state.isLogin=true;},
        LogOut:(state,action)=>{state.isLogin=false;}
    }
});

const store=configureStore({reducer:userstate.reducer});

export const {LogIn,LogOut}=userstate.actions;
export default store;