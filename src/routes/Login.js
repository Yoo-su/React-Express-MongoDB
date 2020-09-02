import React ,{useState} from 'react';
import {Button} from 'react-bootstrap';
import "./Login.css";
import axios from 'axios';
import {connect} from "react-redux";
import {LogIn} from "../store";

const Login=({history,LoginTrue,isLogin})=>{
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
                LoginTrue();
                console.log(isLogin);
                history.push("/");
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

function mapStateToProps(state){
    return {isLogin:state.isLogin};
}

const mapDispatchToProps=(dispatch,ownProps)=>{
  return{
    LoginTrue:()=>{dispatch(LogIn())}
  }
}

export default connect(mapStateToProps,mapDispatchToProps) (Login);