import React ,{useState, useEffect} from 'react';
import {Button} from 'react-bootstrap';
import "./Login.css";
import axios from 'axios';

const Login=()=>{
    const [inputEmail,setEmail]=useState("");
    const [inputPW,setPW]=useState("");

    function onSubmit(e){
        e.preventDefault();
    };

    function handleEmail(e){
        setEmail(e.target.value);
    }
    
    function handlePW(e){
        setPW(e.target.value);
    }

    function PostData(){
        axios.post("http://localhost:3002/api/login",{
            email:inputEmail,
            password:inputPW
        },{withCredentials:true}).then(res=>{  //withCredentila:true 이거 해줘야 서버에서 쿠키 제대로 가져옴
            if(res.data.loginSuccess===true){
                alert("로그인 성공");
                window.location.href="#/";
            }else{
                alert(res.data.message);
            }
        })
        .catch(err=>{console.log(err);});
    }

    return (
        <div className="Login">
            <h1>Login Page</h1><br></br>
            <form onSubmit={onSubmit}>
                Email <input placeholder="이메일을 입력하세요" onChange={handleEmail}></input><br></br><br></br>
                password <input placeholder="비밀번호를 입력하세요" onChange={handlePW}></input><br></br>
                <Button variant="primary" onClick={PostData}>로그인</Button>
            </form>
        </div>
    );
}

export default Login;