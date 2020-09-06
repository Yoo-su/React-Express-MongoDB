const express=require('express');
const router=express.Router();
const {User} = require('../model/User');
const {auth}=require("../../middleware/authPost");
router.use(express.json());

router.post("/", auth, (req,res)=>{
    User.findOneAndUpdate({_id:req.user._id},{ $push: { pocket:{
        id:req.body.id,
        image:req.body.image,
        title:req.body.title,
        author:req.body.author,
        price:req.body.price,
        discount:req.body.discount,
        link:req.body.link
    }}},(err,user)=>{
        if(err) return res.json({success:false,err});
      return res.status(200).send({
          success:true,
      });
    });
});

module.exports=router;