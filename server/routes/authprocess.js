const express=require('express');
const router=express.Router();
const cookieparser=require("cookie-parser");
const {auth}=require("../../middleware/auth");
router.use(express.json());
router.use(cookieparser());

router.get("/", auth, (req, res) => {
    //auth 미들웨어를 통과한 상태 이므로
    //req.user에 user값을 넣어줬으므로
  
    res.status(200).send({
      _id: req._id,
      isAdmin: req.user.role === 09 ? false : true,
      isAuth: true,
      email: req.user.email,
      name: req.user.name,
      role: req.user.role,
      pocket:req.user.pocket
    });
  });

  module.exports=router;