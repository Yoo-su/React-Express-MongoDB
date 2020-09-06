const {User}=require("../server/model/User");

let auth=(req,res,next)=>{
    let token=req.body.cookies;

    User.findByToken(token)
    .then((user)=>{
        if(!user)return res.json({isAuth:false,error:true});
        req.token=token;
        req.user=user;
        next();
    })
    .catch((err)=>{
        throw err;
    });
};

module.exports={auth};
