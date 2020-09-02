import React,{Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {Button} from 'react-bootstrap';
import Book from '../Components/Book';
import './SearchBooks.css';

function PocketBtn(props){
    const isLogin=props.isLogin;
    if(isLogin===true){
       return (
        <Link to={{
            pathname:'/Mybooks'
        }}><Button variant="primary" className="topocket">나의 장바구니</Button></Link>
       );
    }else return(
        <></>
    );
}

function LoginBtn(props){
    const isLogin=props.isLogin;
    if(isLogin===false){
        return(
            <Link to={{
                pathname:'/Login'
            }}><Button variant="success" className="LoginBtn">로그인</Button></Link>
        );
    }else return(<></>);
}

class SearchBooks extends Component{
    state={
        isLoading:true,
        isLogin:false,
        curUser:{},
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
         this.state.isLogin=true;
         const token=document.cookie.split("=")[1];
         axios.get("http://localhost:3002/api/auth",{
             params:{cookies:token}
         })
        .then(res=>{this.setState({curUser:res}); console.log(this.state.curUser);});
        
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

    render(){
        const {isLoading,isLogin,books}=this.state;
        const{
            handleChange,
            handleSubmit,
        }=this;

        function LogoutBtn(props){
            const isLogin=props.isLogin;
            if(isLogin===true){
                return(
                    <Button variant="danger" className="LogoutBtn" onClick={()=>{
                        const token=document.cookie.split("=")[1];
                        axios.get("http://localhost:3002/api/logout",{
                     params:{cookies:token}
                 },{withCredentials:true}).then(res=>console.log(res));
                    }}>로그아웃</Button>
                );
            }else return (<></>);
        }
        return(
           <div className="container">
            {isLoading?(
                <div className="loader">
                  <h1>로딩중</h1>
                </div>
            ):( 
                <div>
                <PocketBtn isLogin={isLogin}></PocketBtn>
                <LoginBtn isLogin={isLogin}></LoginBtn>
                <LogoutBtn isLogin={isLogin}></LogoutBtn>
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

export default SearchBooks;