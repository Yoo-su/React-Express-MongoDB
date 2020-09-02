import React from 'react';
import {Button} from 'react-bootstrap';
import './Pocketbook.css';

const Pocketbook=({image,link,title,author,price,discount})=>{
     return(
         <div className="pocketbook">
           <div className="pimage">
           <img src={image} alt={link}></img>
           </div>
           <div className="cont">
               <p>제목: {title}</p>
               <p>저자: {author}</p>
               <p>정가: {price}원 / 할인가: {discount}원</p>
               <Button onClick={()=>{
                 window.open(link);
               }}>구매 링크로 이동</Button>
               <Button style={{float:"right"}} variant="danger" onClick={()=>{}}>X</Button>
           </div>
           <br></br>
           <br></br>
         </div>
     );
}


export default Pocketbook;