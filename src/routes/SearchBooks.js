import React,{Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {Button} from 'react-bootstrap';
import Book from '../Components/Book';
import './SearchBooks.css';
import { connect } from 'react-redux';
import {LogIn,LogOut} from "../store";

class SearchBooks extends Component{
    state={
        isLoading:true,
        value:"",
        books:[]
    };

    /* getBooks함수는 실행되면 setState를 통해 현재 입력창에
    입력된 value값에 대한 검색 결과를 books배열에 넣어주고 화면을
     다시 render하도록 한다.*/ 
    getBooks=async()=>{
        const search=this.state.value;
        
        try{
            if(search===''){
                this.setState({books:[],isLoading:false})
            }
            else{
                const{data:{
                    items
                }}=await axios.get('http://localhost:3002/api/search',{
                    params:{
                        query:search,
                    }
                })
            
                this.setState({books:items, isLoading:false});
            }
        }catch(error){
            console.log(error);
        }
    }
    
    //컴포넌트가 렌더링되면서 getBook함수 호출
    componentDidMount(){
     if(document.cookie){
         this.props.LoginTrue();
     }
     this.getBooks();
    };
   
    //입력창의 value가 변경되면 변경된 값을 value State로 setState해주고 render
   handleChange=(e)=>{
     this.setState({value:e.target.value});
   };
   
   //form이 전송안하게하고 getbooks함수를 호출함
   handleSubmit=(e)=>{
       e.preventDefault();
       this.getBooks();
   };

    PocketBtn=()=>{
    if(this.props.isLogin===true){
       return (
        <Link to={{
            pathname:'/Mybooks'
        }}><Button variant="primary" className="topocket">나의 장바구니</Button></Link>
       );
    }else return(
        <></>
     );
    };
    LoginBtn=()=>{
    if(this.props.isLogin===false){
        return(
            <Link to={{
                pathname:'/Login'
            }}><Button variant="info" className="LoginBtn">SignIn</Button></Link>
        );
    }else return(<></>);
    };
   
    SignupBtn=()=>{
        if(this.props.isLogin===false){
            return(
                <Link to={{
                    pathname:'/Signup'
                }}><Button variant="success" className="LoginBtn">SignUp</Button></Link>
            );
        }else return(<></>);
        };

    LogoutBtn=()=>{
    if(this.props.isLogin===true){
        return(
            <Button variant="danger" className="LogoutBtn" onClick={this.props.LoginFalse,()=>{
                const cook=document.cookie.split("=")[1];
                let isOut=true; 

                axios.get("http://localhost:3002/api/logout",{
                    params:{cookies:cook}
                }).then(res=>{isOut=res.data.success}).catch(err=>console.log(err));

                if(isOut===true){
                    document.cookie="x_auth=; expires=Thu, 01 Jan 1999 00:00:10 GMT;"; //쿠키제거
                    document.location.reload(true);
                }
                
            }}>Logout</Button>
        )
    }
    };

    render(){
        const {isLoading,books}=this.state;
        const{
            handleChange,
            handleSubmit,
            PocketBtn,
            LoginBtn,
            LogoutBtn,
            SignupBtn
        }=this;
        
        return(
           <div className="container">
            {isLoading?(
                <div className="loader">
                  <h1>로딩중</h1>
                </div>
            ):( 
                <div>
                {PocketBtn()}
                {LoginBtn()}
                {LogoutBtn()}
                {SignupBtn()}
                <br></br><br></br>
                <form onSubmit={handleSubmit}>
                  <div className="input_div">
                      <h1>Search Books</h1>
                      <input className="input_search" type="text" value={this.state.input} onChange={handleChange} placeholder="키워드 입력..."></input>
                  </div>
                  <br></br>
                  <div className="books">
                  {books.map(book=>(
                      <Book key={book['link']} id={book['link']} image={book['image']} title={book['title']} author={book['author']} 
                      publ={book['publisher']} price={book['price']} link={book['link']} desc={book.description} 
                      discount={book.discount} />
                  ))}</div>
                </form>
                </div>
            )}
           </div>
        );
    }
}

function mapStateToProps(state){
    return {isLogin:state.isLogin};
}

function mapDispatchToProps(dispatch,ownProps){
  return{
      LoginTrue:()=>{dispatch(LogIn())},
      LoginFalse:()=>{dispatch(LogOut())}
  }
}

export default connect(mapStateToProps,mapDispatchToProps) (SearchBooks);