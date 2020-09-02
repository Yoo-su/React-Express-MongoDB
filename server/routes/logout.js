const express=require("express");
const router=express.Router();
const {User}=require("../model/User");
const {auth}=require("../../middleware/auth");
router.use(express.json());

router.get("/",auth,(req,res)=>{
  User.findOneAndUpdate({_id:req.user._id},{token:""},(err,user)=>{
      if(err) return res.json({success:false,err});
      res.clearCookie({name:"x_auth"});
      return res.status(200).send({
          success:true,
      });
  });
});

module.exports=router;