const express=require('express');
const router=express.Router();
const {User}=require("../model/User");
router.use(express.json());

router.post("/", (req, res) => {
    //로그인을할때 아이디와 비밀번호를 받는다
    User.findOne({ email: req.body.email }, (err,user) => {
      if (user===null) {
        return res.json({
          loginSuccess: false,
          message: "존재하지 않는 아이디입니다.",
        });
      }
      user
        .comparePassword(req.body.password)
        .then((isMatch) => {
          if (isMatch===false) {
            return res.json({
              loginSuccess: false,
              message: "비밀번호가 일치하지 않습니다",
            });
          }
      //비밀번호가 일치하면 토큰을 생성한다
      //jwt 토큰 생성하는 메소드 작성
          user
            .generateToken()
            .then((user) => {
              res.cookie("x_auth", user.token).status(200)
                .json({ loginSuccess: true, userId: user._id });
            })
            .catch((err) => {
              res.status(400).send(err);
            });
        })
        .catch((err) => res.json({ loginSuccess: false, err }));
  
    });
  
  });

  module.exports=router;