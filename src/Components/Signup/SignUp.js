import React, { Component } from "react";
import PropTypes from "prop-types";
import { Input, Button, message, Layout } from "antd";
import { Card } from "antd";
import firebase from "../../firebase";
// import bgImg from "../../images/loginbg.jpg";
import OtpInput from 'react-otp-input';
import "./SignUp.css";
import axios from 'axios';
import { DownloadOutlined, PoweroffOutlined, CheckCircleTwoTone, CloseCircleTwoTone } from "@ant-design/icons";
import { withRouter, Link } from "react-router-dom";
import { Drawer, Form, Col, Row, Select, DatePicker } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { AiFillHeart } from "react-icons/ai";
const { Header, Content, Footer, Sider } = Layout;
const { Option } = Select;
export class SignUp extends Component {
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
      visible: false,
      usernameNotValid:false,
      result:{}
    };
  }

  

  setMobileNumber = (e) => {
    const re = /^[0-9\b]+$/;
    if (e.target.value === "" || re.test(e.target.value)) {
      this.setState({ mobile: e.target.value });
    }
  };

  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    },()=>window.location.reload());// ,
    
  };

  onCloseAftercomplete = () => {
    this.setState({
      visible: false,
    },()=>this.props.history.push("/"));// ,
    
  };
  handleClickSignIn = () =>{
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/user/getUserByMobile/`+parseInt(this.state.mobile))
    .then(res => {
      
      let user = res.data;
      if(user.length>0){
        message.error('User already exists.');
          this.setState({
              user:res.data[0]
          })//,()=>this.handleClickSignInUsingMobile()
          
      }
      else{
          console.log("User does not exists");
          this.handleClickSignInUsingMobile();
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
              isloggedIn:true,
              result:result
            },()=>this.showDrawer()
            // ,
            // ()=>{
            //     this.props.setLoggedIn(result.user);
            //     console.log(this.state.user.posts)
            //     this.props.setLoggedInUser(this.state.user);
            //     this.props.history.push("/timeline");
            // }
            );
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


  onFinish = values => {
    console.log('Success:', values);
    let firstname = values.firstname;
    let lastname = values.lastname;
    let username = values.username;
    if(lastname===undefined){
        lastname="";
    }
    let formdata = {
        "firstName":firstname,
        "lastName":lastname,
        "userName":username,
        "followers":[],
        "following":[],
        "posts":[],
        "type":false,
        "mobileNumber":parseInt(this.state.mobile)
    }
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/user/addNewUser`,formdata).then((res)=>{
        if(res.data.userName!==undefined && res.data.userName !==null && res.data.userName.length>0){
          message.success('Welcome to the college family !!');
                this.props.setLoggedIn(this.state.result.user);
                this.props.setLoggedInUser(res.data);
                this.setState({
                    visible:false
                },()=>this.props.history.push("/timeline"))
                

        }
        else{
            console.log("error-> user not created");
        }
    }).catch(err=>{
        console.log(err);
        this.onCloseAftercomplete();
        
    })
  };

  onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  onhandleCheckUserName=(e)=>{
      let username = e.target.value;
    //   console.log(username);
      if(username.length>0){
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/user/getUserByUserName/`+username).then((res)=>{
            if(res.data.length>0)
            {
                this.setState({
                    usernameNotValid:true
                })
            }
            else{
                this.setState({
                    usernameNotValid:false
                })
            }
        })
      }
  }

  render() {
    return (
      <Layout>
      <div
        style={{
          backgroundImage: `url("https://firebasestorage.googleapis.com/v0/b/collegebook-2ffc0.appspot.com/o/loginbg.jpg?alt=media")`,//`url(${bgImg})`,
          ackgroundRepeat: "no-repeat",
          minHeight: "90vh",
        }}
        className="SignUpBg"
      >
        <div className="sign-in-form">
          <Card title="Sign Up" bordered={true} style={{ width: 350 }}>
            <label style={{ float: "left", marginBottom: "5px" }}>
              Please verify your mobile number
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
                Verify{" "}
              </Button>
              <p style={{marginTop:"10px"}}>Already have account? <Link to="/">Log In</Link></p>
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



        <Drawer
          title="Create a new account"
          width={720}
          onClose={this.onClose}
          visible={this.state.visible}
          bodyStyle={{ paddingBottom: 80 }}
        //   footer={
        //     <div
        //       style={{
        //         textAlign: 'right',
        //       }}
        //     >
        //       <Button onClick={this.onClose} style={{ marginRight: 8 }}>
        //         Cancel
        //       </Button>
        //       <Button type="primary" htmlType="submit" >
        //       {/* onClick={this.onClose} */}
        //         Submit
        //       </Button>
        //     </div>
        //   }
        >

            <Form
               layout="vertical"
                name="basic"
                initialValues={{
                    remember: true,
                }}
                onFinish={this.onFinish}
                onFinishFailed={this.onFinishFailed}
                >
                    <Col span={24}>
                <Form.Item
                  name="firstname"
                  label="First Name"
                  rules={[{ required: true, message: 'Please enter first name' }]}
                >
                  <Input placeholder="Please enter first name" />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  name="lastname"
                  label="Last Name"
                //   rules={[{ required: true, message: 'Please enter last name' }]}
                >
                  <Input placeholder="Please enter last name" />
                </Form.Item>
              </Col>

              
              <Col span={24}>
                <Form.Item
                  name="username"
                  label="User Name"
                  rules={[{ required: true, message: 'Please enter user name' }]}
                >
                  <Input onChange={(e)=>this.onhandleCheckUserName(e)} placeholder="Please enter user name" />
               </Form.Item>
               {this.state.usernameNotValid &&                  <p className="username-warning">Username not available. Try with different name.</p>
} 
              </Col>

              {/* <Col span={24}>
                <Form.Item
                  name="email"
                  label="Email"
                  rules={[{ required: true, message: 'Please enter valid email' }]}
                >
                  <Input placeholder="Please enter valid email" />
                </Form.Item>
              </Col> */}


                <Form.Item>
                <div
              style={{
                textAlign: 'right',
              }}
            >
              <Button onClick={this.onClose} style={{ marginRight: 8 }}>
                Cancel
              </Button>
              <Button type="primary" htmlType="submit" >
              {/* onClick={this.onClose} */}
                Submit
              </Button>
            </div>
                </Form.Item>
                </Form>





        
        </Drawer>
      </div><Footer style={{ textAlign: "center" , height:"10vh"}}>
            CollegeBook ©2020 Made with <AiFillHeart className="madewithlove" style={{color:"red"}}/> by a <strong>Vitian</strong>
          </Footer></Layout>
    );
  }
}

export default withRouter(SignUp);
