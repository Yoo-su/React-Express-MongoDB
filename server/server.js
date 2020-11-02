//서버 생성 코드
const express=require('express');
const app=express();
const api=require('./routes/index');
const cors = require('cors');
const io=require('socket.io');
const port=process.env.PORT||3002;

app.use(cors({
    origin: true,
    credentials: true
}));
app.use('/api',api);

app.listen(port,()=>console.log('Server is running!'));
