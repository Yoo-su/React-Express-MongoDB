import React, {useState,useEffeft} from 'react';
import Bookdetail from './Bookdetail';
import Popup from 'reactjs-popup';
import './Book.css';

const Book=({id,image,title,author,publ,price,discount,desc,link})=>{
  title=title.replace(/<b>/gi,'').replace(/<\/b>/gi,'');
  desc=desc.replace(/<b>/gi,'').replace(/<\/b>/gi,'');
  publ=publ.replace(/<b>/gi,'').replace(/<\/b>/gi,'');
  desc=desc.replace(/&#x0D;/gi,'').replace(/&lt/gi,'').replace(/&gt/gi,'').replace(/&quot;/gi,'');
  author=author.replace(/<b>/gi,'').replace(/<\/b>/gi,'');
  const rindex=image.indexOf("?type");
  const newimg=image.substr(0,rindex);
  const [popup,setpopup]=useState(false);

   return(
       <div className="book">
         <Popup position="bottom center" contentStyle={{background:"#efefef",width: "700px"}} trigger={
           <div>
           <div className="cover">
           <img src={image} alt={title}></img></div>
          <div className="contents">
           <p className="title"><span>제목: {title}</span></p>
           <p className="author"><span>저자명: {author}</span></p>
           <p className="publisher"><span>출판사: {publ}</span></p>
           </div>
           </div>
         }><Bookdetail id={id} image={image} newimage={newimg} title={title} author={author} publ={publ} price={price}
          discount={discount} desc={desc} link={link} />
          </Popup>
          <br></br>
          <br></br>
          <br></br>
        </div>
   );
}

export default Book;