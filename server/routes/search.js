const express=require("express");
const router=express.Router();
const axios=require("axios");
router.use(express.json());

const ID_KEY='tq3Jki2DtzIL1_kXhvq3';
const SECRET_KEY='eIasCydQys';

router.get("/",(req,res)=>{
    const word=req.query.query;

    axios.get("https://openapi.naver.com/v1/search/book.json",{
        params:{
            query:word,
            display:100
        },
        headers:{
            'X-Naver-Client-Id': ID_KEY, 
            'X-Naver-Client-Secret': SECRET_KEY,
            'Access-Control-Allow-Origin': '*'
        }
    }).then(response=>{
        const items=response.data.items;
        res.send({items:items});
    }).catch(err=>{
        console.log(err);
    });
});

module.exports=router;