import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import firebase from "./firebase";
import Header from './Components/Header/Header';
import Sidebar from './Components/Sidebar/Sidebar';
import Login from './Components/Login/Login';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

export class App extends Component {
  constructor(props){
    super(props);

    this.state={
      isloggedIn:false,
      user:null,
      loggedInUser:null,
      // loggedInUser:{
      //   "firstName":"Pankaj",
      //   "lastName":"Mishra",
      //   "userName":"panmish",
      //   "userId":1,
      //   "mobileNumber":1234567890,
      //   "followers":"11111111",
      //   "following":"111111111111111111111111111111111111",
      //   "bio":"All your dreams can come true and I'll make sure of it.",
      //   "posts":[{"imgUrl":"https://www.yourtrainingedge.com/wp-content/uploads/2019/05/background-calm-clouds-747964.jpg"},1,1,1,1,1]
       
      // },
      myPosts:[],
      showSearchBar:false
    }
  }

  setsearchBar = (value) =>{
    this.setState({
      showSearchBar : value
    })
  }
  
  setLoggedIn = (user)=>{
    if(user!==null ){
      this.setState({
        isloggedIn:true,
        user:user,
      })
    }
    else{
      this.setState({
        isloggedIn:false,
        user:user
      })
    }
  }

  setLoggedInUser = (user)=>{
    let posts = user.posts;
    posts.sort((a,b)=>{
      return b.postId - a.postId;
    })
    this.setState({
      loggedInUser:user,
      myPosts:posts
    })
  }

  componentDidMount(){
    firebase.auth().onAuthStateChanged(authUser => {
      authUser
        ? this.setState({ user:authUser,setLoggedIn:true })
        : this.setState({ user: null });
    });
  
    
  }

  render() {
    return (
      <div className="App">
        <Router basename="/">
          {!this.state.isloggedIn && <Route
            path="/"
            exact
            render={props => (
              <Login
               setLoggedIn = {this.setLoggedIn}
               setLoggedInUser = {this.setLoggedInUser}
              />
            )}
          />}

            <Route path="/timeline">
              {this.state.isloggedIn && this.state.user!==null && this.state.user!==undefined ? (
                <>
                    <Header setsearchBar={this.setsearchBar} showSearchBar ={this.state.showSearchBar} setLoggedInUser = {this.setLoggedInUser} setLoggedIn={this.setLoggedIn} loggedInUser={this.state.loggedInUser}/>
                  <div style={{marginTop:"14px"}}>
                  <Sidebar setsearchBar={this.setsearchBar} myPosts={this.state.myPosts} loggedInUser={this.state.loggedInUser}/>
                  </div>
                </>
             ) : (
                  <Redirect to="/" />
                )}    
            </Route>

          
          </Router>
      
      
    </div>
    )
  }
}

export default App
