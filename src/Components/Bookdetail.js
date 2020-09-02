import React from 'react';
import {Button} from 'react-bootstrap';
import './Bookdetail.css';

const Bookdetail=({id,image,newimage,title,author,price,discount,desc,publ,link})=>{
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
          <Button variant='primary'  onClick={()=>{
          alert("장바구니에 담겼습니다 :)");
        }}>장바구니 담기</Button>
        </div>
        </div>
      </div>
  );
}

export default Bookdetail;