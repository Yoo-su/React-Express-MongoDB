import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers';
import {Button} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import * as yup from "yup";
import "./Signup.css";

const schema = yup.object().shape({
  Name: yup.string().strict(),
  Email: yup.string(),
  Password:yup.string()
});

export default function Signup() {
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema)
  });
  const onSubmit = data => {
      console.log(data);
      axios.post("http://localhost:3002/api/register",data)
      .then(res=>{
          if(res.data.success===true){
              alert("회원가입 성공!");
            window.location.href="#/Login";
          }else{
              alert("에러");
          }
      })
      .catch(error=>{
          console.log(error);
        });
    }

  return (
      <div id="SignupForm">
          <h1>Create Account</h1>
    <form onSubmit={handleSubmit(onSubmit)}>
      Name      <input type="text" name="name" ref={register} />
      <p>{errors.Name?.message}</p>
        
      Email     <input type="text" name="email" ref={register} />
      <p>{errors.Email?.message}</p>
      
      Password  <input type="text" name="password" ref={register} />
      <p>{errors.Password?.message}</p>

      <Button variant="primary" type="submit">완료</Button>
    </form>
    </div>
  );
}