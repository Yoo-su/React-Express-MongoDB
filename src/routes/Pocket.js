import React,{Component} from 'react';
import {Button} from 'react-bootstrap';
import Pocketbook from '../Components/Pocketbook';
import './Pocket.css';

function Pocket({history}){
  const pocketbook=useSelector(state=>state.pocket);
  return(
      <div className="pocket">
      <Button style={{float:"right"}} onClick={history.goBack}>돌아가기</Button>
        <span className="ptitle"><h1>내 장바구니</h1></span>
        <div className="pbooks">
        {pocketbook.map(mb=>(
            <Pocketbook key={mb.link} id={mb.id} image={mb.image} title={mb.title} author={mb.author}
            price={mb.price} discount={mb.discount} link={mb.link}></Pocketbook>
        ))}</div>
      </div>
  );
}


export default Pocket;