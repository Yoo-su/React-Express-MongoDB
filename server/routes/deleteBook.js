const express=require("express");
const router=express.Router();
const {User}=require("../model/User");
const {auth}=require("../../middleware/authPost")
router.use(express.json());

router.post("/",auth,(req,res)=>{
  User.findOneAndUpdate({_id:req.user._id},{pocket:req.user.pocket.filter(book=>book.id!==req.body.bookId)},(err,user)=>{
    if(err) return res.json({success:false,err});
    return res.status(200).send({
        success:true,
    });
  });
});

module.exports=router;