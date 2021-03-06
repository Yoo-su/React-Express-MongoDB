//api 라우터 코드
const register=require("./register");
const login=require("./login");
const search=require("./search");
const database=require("./database");
const express=require('express');
const auth=require("./authprocess");
const logout=require("./logout");
const addToPocket=require("./addToPocket");
const deleteBook=require("./deleteBook");
const router=express.Router();

router.use("/search",search);

router.use("/register",register);

router.use("/login",login);

router.use("/auth",auth);

router.use("/logout",logout);

router.use("/addToPocket", addToPocket);

router.use("/deleteBook", deleteBook);

module.exports= router;