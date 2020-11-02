import React from 'react';
import {Button,Modal} from 'react-bootstrap';
import './Bookdetail.css';
import {connect} from "react-redux";
import axios from "axios";

const Bookdetail=({id,image,title,author,price,discount,desc,publ,link,isAuth,show,setShow})=>{
  return(
      <div className="detail">
        <Modal size="lg" show={show} onHide={setShow}>
          <div id="coverImg" style={{textAlign:"center"}}> 
          <img src={image} style={{width:"500px"}}></img>
          </div>
          <Modal.Body>
           <b>제목: </b>{title}<br></br>
           <b>저자명: </b>{author}<br></br>
           <b>출판사: </b>{publ}<br></br>
           <b>정가: </b>{price}원 / <b>할인가: </b>{discount}원<br></br><br></br>
           <div id="description">
           {desc}
           </div>
          </Modal.Body>
          <Modal.Footer> 
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
                link:link,
                test:"똥똥 에그더러워!"
            },{withCredentials:true}).then(res=>{
              console.log(res); 
              if(res.data.success===true){
              alert("장바구니에 담겼습니다")
            }}).catch(err=>console.log(err));
          }}>장바구니 담기</Button>):(<></>)
          }
        </div>
          </Modal.Footer>
        </Modal>
      </div>
  );
}

function mapStateToProps(state){
  return{
    isAuth:state.isLogin
  };
}

export default connect(mapStateToProps,null) (Bookdetail);