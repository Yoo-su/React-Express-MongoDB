//api 라우터 코드
const register=require("./register");
const login=require("./login");
const database=require("./database");
const express=require('express');
const router=express.Router();

router.use("/register",register);

router.use("/login",login);

module.exports= router;