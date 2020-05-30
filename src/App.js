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
      user:null
    }
  }
  
  setLoggedIn = (user)=>{
    if(user!==null ){
      this.setState({
        isloggedIn:true,
        user:user
      })
    }
    else{
      this.setState({
        isloggedIn:false,
        user:user
      })
    }
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
        <Router basename="/app">
          {!this.state.isloggedIn && <Route
            path="/"
            exact
            render={props => (
              <Login
               setLoggedIn = {this.setLoggedIn}
              />
            )}
          />}

            <Route path="/timeline">
              {/* {this.state.isloggedIn && this.state.user!==null && this.state.user!==undefined ? ( */}
                <>
                    <Header setLoggedIn={this.setLoggedIn}/>
                  <div style={{marginTop:"14px"}}>
                  <Sidebar />
                  </div>
                </>
             {/* ) : (
                  <Redirect to="/" />
                )} */}
            </Route>

          
          </Router>
        {/* <Login/> */}
     {/* <Header/>
      <div style={{marginTop:"14px"}}>
      <Sidebar />
      </div> */}
      
    </div>
    )
  }
}

export default App
