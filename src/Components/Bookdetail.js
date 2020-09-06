import React from 'react';
import {Button} from 'react-bootstrap';
import './Bookdetail.css';
import {connect} from "react-redux";
import axios from "axios";

const Bookdetail=({id,image,newimage,title,author,price,discount,desc,publ,link,isAuth})=>{
  return(
      <div className="detail">
        <div className="bigimg">
          <img src={newimage} alt={title}></img>
        </div>
        <div className="info">
          <p className="title"><span>제목: {title}</span></p>
          <p className="author"><span>저자명: {author}</span></p>
          <p className="publisher"><span>출판사: {publ}</span></p>
          <p className="price"><span>정가: {price}원 / 할인가: {discount}원</span></p>
          <p className="desc"><span>{desc}</span></p>
          <div className="topocketb">
          {isAuth?(<Button variant='primary'  onClick={()=>{
            let isSuccess=false;
            axios.post("http://localhost:3002/api/addToPocket",
            { 
                cookies:document.cookie.split("=")[1],
                id:id,
                image:image,
                title:title,
                author:author,
                price:price,
                discount:discount,
                link:link
            },{withCredentials:true}).then(res=>{
              console.log(res); 
              if(res.data.success===true){
              alert("장바구니에 담겼습니다")
            }}).catch(err=>console.log(err));
          }}>장바구니 담기</Button>):(<></>)
          }
        </div>
        </div>
      </div>
  );
}

function mapStateToProps(state){
  return{
    isAuth:state.isLogin
  };
}

export default connect(mapStateToProps,null) (Bookdetail);