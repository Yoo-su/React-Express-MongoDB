import React,{useState} from 'react';
import {Card} from 'react-bootstrap';
import Bookdetail from './Bookdetail';
import './Book.css';

const Book=({id,image,title,author,publ,price,discount,desc,link})=>{
  title=title.replace(/<b>/gi,'').replace(/<\/b>/gi,'');
  desc=desc.replace(/<b>/gi,'').replace(/<\/b>/gi,'');
  publ=publ.replace(/<b>/gi,'').replace(/<\/b>/gi,'');
  desc=desc.replace(/&#x0D;/gi,'').replace(/&lt/gi,'').replace(/&gt/gi,'').replace(/&quot;/gi,'');
  author=author.replace(/<b>/gi,'').replace(/<\/b>/gi,'');
  const rindex=image.indexOf("?type");
  const newimg=image.substr(0,rindex);
  const [showDetail,setShowDetail]=useState(false);
  
  function modalOnOff(){
    setShowDetail(!showDetail);
  }

   return(
       <div className="book">
         <Card style={{width:"10rem"}} onClick={()=>{modalOnOff();}}>
           <Card.Img variant="top" src={newimg} style={{width:"10rem"}}></Card.Img>
          <Card.Body>
           <Card.Title style={{fontSize:"12px"}}><b>{title}</b></Card.Title>
           <Card.Text style={{fontSize:"9px"}}><b>저자: </b>{author}<br></br>
            <b>출판사: </b>{publ}<br></br>
           </Card.Text>
          </Card.Body>
          </Card>
          <Bookdetail show={showDetail} image={newimg} setShow={modalOnOff} id={id} title={title} author={author}
           publ={publ} price={price} discount={discount} desc={desc} link={link}></Bookdetail>
        </div>
   );
}

export default Book;