import React,{useState,useEffect} from 'react';
import {Button} from 'react-bootstrap';
import axios from "axios";
import Pocketbook from '../Components/Pocketbook';
import './Pocket.css';
class Pocket extends React.Component{
  state={
    items:[]
  };

  getPocket=async()=>{
   await axios.get("http://localhost:3002/api/auth",{
     params:{cookies:document.cookie.split("=")[1]}
   }).then((res)=>{this.setState({items:res.data.pocket});});
 };

 componentDidMount(){
   this.getPocket();
 }

  render(){
  return(
      <div className="pocket">
      <Button style={{float:"right"}} onClick={this.props.history.goBack}>돌아가기</Button><br></br><br></br>
        <span className="ptitle"><h1>내 장바구니</h1></span>
      {  <div className="pbooks">
        {this.state.items.map(mb=>(
            <Pocketbook key={mb.link} id={mb.id} image={mb.image} title={mb.title} author={mb.author}
            price={mb.price} discount={mb.discount} link={mb.link}></Pocketbook>
        ))}</div> } 
      </div>
  );
}
}

export default Pocket;