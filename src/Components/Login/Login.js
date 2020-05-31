import React, { Component } from "react";
import PropTypes from "prop-types";
import { Input, Button } from "antd";
import { Card } from "antd";
import firebase from "../../firebase";
import bgImg from "../../images/pencils-1280558_1920.jpg";
import OtpInput from 'react-otp-input';
import "./Login.css";
import axios from 'axios';
import { DownloadOutlined, PoweroffOutlined, CheckCircleTwoTone, CloseCircleTwoTone } from "@ant-design/icons";
import { withRouter, Link } from "react-router-dom";
export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mobile: "",
      value: "Enter your 10 digit mobile",
      hideSignIn: false,
      pauseLoading: false,
      showOtpScreen: false,
      waiting:false,
      e:{},
      code:'',
      otpLoading:false,
      isDisabled:false,
      isloggedIn:false,
      user:null,
      returnfromSignUp:false
    };
  }

  // componentDidMount(){
  //   if(this.state.returnfromSignUp){
  //     this.props.history.push("/timeline");
  //   }
  // }

  setMobileNumber = (e) => {
    const re = /^[0-9\b]+$/;
    if (e.target.value === "" || re.test(e.target.value)) {
      this.setState({ mobile: e.target.value });
    }
  };

  handleClickSignIn = () =>{
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/user/getUserByMobile/`+parseInt(this.state.mobile))
    .then(res => {
      let user = res.data;
      if(user.length>0){
          this.setState({
              user:res.data[0]
          },()=>this.handleClickSignInUsingMobile())
          
      }
      else{
          console.log("User does not exists");
      }
    })
  }

  handleClickSignInUsingMobile = async () => {
    this.setState({
      hideSignIn: true,
      pauseLoading: true,
    });
    var recaptcha = await new firebase.auth.RecaptchaVerifier("recaptcha");
    console.log(recaptcha);
    setTimeout(
      function () {
        this.setState({ pauseLoading: false });
      }.bind(this),
      1500
    );
    var number = "+91" + `${this.state.mobile}`;
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE);
    firebase
      .auth()
      .signInWithPhoneNumber(number, recaptcha)
      .then((e)=> {
        this.setState({
          showOtpScreen: true,
          waiting:true
        });
        // var code = prompt("Enter the otp", "");
    
        if (this.state.code === null) return;

        else{
            this.setState({
                e
            })
        }
      })
      .catch((error)=> {
        console.error(error);
        this.setState({
          hideSignIn: false,
          pauseLoading: false,
        });
      });
  };

  setCode=(e)=>{
      console.log("code writing")
      this.setState({
          code:e
      },()=>{
          if(e.length>5){
            this.setState({
                waiting:false,
                otpLoading:true,
                isDisabled:true
            },()=>this.confirm())
          }
      })
    
  }


  confirm = ()=>{
      console.log("i am here")
     let e = this.state.e;
     e.confirm(this.state.code)
          .then((result) =>{
            console.log(result.user);

            // document.querySelector("label").textContent +=
            //   result.user.phoneNumber + "Number verified";
            this.setState({
              pauseLoading: false,
              otpLoading:false,
              isDisabled:true,
              isloggedIn:true
            },()=>{
                this.props.setLoggedIn(result.user);
                console.log(this.state.user.posts)
                this.props.setLoggedInUser(this.state.user);
                this.props.history.push("/timeline");
            });
          })
          .catch((error)=> {
            console.error(error);
            this.setState({
              hideSignIn: false,
              pauseLoading: false,
              otpLoading:false,
              isDisabled:true
            });
          });
  }


  // setTrueFromSignUp = (value)=>{
  //   this.setState({
  //     returnfromSignUp:value
  //   })
  // }

  render() {
    return (
      <div
        style={{
          backgroundImage: `url(${bgImg})`,
          ackgroundRepeat: "no-repeat",
          minHeight: "100vh",
        }}
        className="loginBg"
      >
        <div className="sign-in-form">
          <Card title="Sign In" bordered={true} style={{ width: 350 }}>
            <label style={{ float: "left", marginBottom: "5px" }}>
              Login using OTP
            </label>
            <Input
              style={{ textAlign: "center" }}
              onChange={this.setMobileNumber}
              value={this.state.mobile}
              disabled = {this.state.isDisabled?"disabled":""}
              placeholder="Enter your 10 digit mobile number"
            />
            {
               !this.state.isloggedIn && this.state.isDisabled && !this.state.otpLoading && (
                    <div>
                        <p>Wrong Number? <a onClick={()=>window.location.reload()}>Try again</a></p>
                    </div>
                )
            }
            {!this.state.showOtpScreen && (
              <div
                style={{ width: "250px", marginTop: "20px" }}
                id="recaptcha"
              ></div>
            )}
            {this.state.showOtpScreen && (
              <div className="otp-div">
                <OtpInput
                isDisabled={this.state.isDisabled}
                value = {this.state.code}
                    style={{height:"50px"}}
                    onChange={otp => this.setCode(otp)}
                    numInputs={6}
                    separator={<span>&nbsp;&nbsp;&nbsp;</span>}
                 />
              </div>
            )}
            {this.state.otpLoading && <Button style={{marginTop:"20px"}} type="primary" loading>
          Logging In
        </Button>}
        {this.state.isloggedIn && !this.state.otpLoading && <div style={{marginTop:"20px"}} className="success-icon">
        <CheckCircleTwoTone width="50px" height="50px" />
        </div>}
        {!this.state.isloggedIn && this.state.isDisabled && !this.state.otpLoading && <div style={{marginTop:"20px"}} className="success-icon">
        <CloseCircleTwoTone style={{color:"red"}}  width="50px" height="50px" />
        </div>}
            
            {!this.state.hideSignIn && !this.state.isDisabled && (
             <>
              <Button
                onClick={() => this.handleClickSignIn()}
                style={{ marginTop: "20px" }}
                type="primary"
                shape="round"
                icon=""
                size="30"
              >
                {" "}
                Sign In{" "}
              </Button>
              <p style={{marginTop:"10px"}}>Don't have account? <Link to="/signUp">Sign Up</Link></p>
             </>
            )}
            {this.state.hideSignIn && this.state.pauseLoading && (
              <Button
                type="primary"
                style={{ marginTop: "20px" }}
                icon={<PoweroffOutlined />}
                loading
              />
            )}{" "}
          </Card>
        </div>
      </div>
    );
  }
}

export default withRouter(Login);
