//서버 생성 코드
const express=require('express');
const app=express();
const api=require('./routes/index');
const cors = require('cors');

app.use(cors());
app.use('/api',api);

app.listen(3001,()=>console.log('Server is running!'));
