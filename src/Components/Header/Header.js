import React, { Component } from 'react'
import PropTypes from 'prop-types'
import LogoImg from '../../images/icons/school-bag.svg';
import "./Header.css";
import firebase from "../../firebase";
import { Drawer, Form, Col, Row, Input, Select, DatePicker, Upload,message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { InboxOutlined } from '@ant-design/icons';
import ReactSearchBox from 'react-search-box'
import { MDBRow, MDBCol } from "mdbreact";
import axios from "axios";

import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Menu, Dropdown, Button,Spin } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import ProfileLeft from "../ProfileStatsComponent/ProfileLeft";
import ProfileRight from "../ProfileStatsComponent/ProfileRight";

const { Option } = Select;
const { Dragger } = Upload;

var storageRef = firebase.storage().ref();
export class Header extends Component {
    constructor(props){
        super(props);
        this.state={
          visible: false,
          post:{},
          showSearchBar:false,
          data : [],
          postSpin:false,
          visibleProfileDw: false,
       placement: 'bottom',
       pictureToUpload:{}
        }
    }
   
    // {
    //   key: 'john',
    //   value: 'John Doe',
    //   data:null
    // } 
     

    componentDidMount(){
      this.props.setsearchBar(false);
    }

    componentWillReceiveProps(props){
      this.setState({
        showSearchBar:props.showSearchBar
      })
    }
    showDrawer = () => {
      // this.props.setsearchBar(false);
      this.setState({
        visible: true,
      });
    };
  
    onCloseDw = () => {
      this.setState({
        visibleProfileDw: false,
      });
    };

    signOut = () => {
        console.log(firebase.auth().currentUser);
        firebase.auth().signOut().then(()=> {
            console.log("loggedOut");
                // this.props.setLoggedIn(null);
                console.log(firebase.auth().currentUser);
                // this.props.history.push("/");
                this.props.setLoggedIn(null);
               
          }).catch((error)=> {
            // An error happened.
            console.log(error)
            console.log("An error has occured");
          });
    }

    onhandleSelectAuthor = () =>{
      let post = this.state.post;
      post["authorId"] = this.props.loggedInUser.userId;
      this.setState({
        post
      })
    }

    onhandleAddLocation = (e)=>{
      let post = this.state.post;
      post["location"] = e.target.value;
      this.setState({
        post
      })
    }

    onhadleSelecType = (value)=>{
      console.log(value);
      let post = this.state.post;
      if(value === "public"){
        post["privatePost"]=false
      }else{
        post["privatePost"]=true
      }
      this.setState({
        post
      })
    }

    onhandleCaption = (e) => {
      let post = this.state.post;
      post["postDescription"]=e.target.value;
      this.setState({
        post
      })
    }

    onhandleCreatePost = async () =>{
     this.setState({
       postSpin:true
     })
      let post = this.state.post;
      post["likeCount"]=0;
      post["shareCount"]=0;
      post["createDate"]=new Date();
      post["likedUsers"]=[];
      post["userName"]=this.props.loggedInUser.userName;
      post["firstName"]=this.props.loggedInUser.firstName;
      post["lastName"]=this.props.loggedInUser.lastName;
      post["imgUrl"]="";
      this.setState({
        post
      },()=>{
        let formData = {
          "post":this.state.post,
          "mobile":this.props.loggedInUser.mobileNumber

        };
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/post/addNewPost`, formData)
        .then(async(response)=> {
          let upload =  await storageRef.child('posts/'+response.data[1]+".jpg").put(this.state.pictureToUpload.originFileObj);
          console.log(upload);
          console.log(response.data);
          this.setState({
            visible: false,
            postSpin:false
          },()=>{
            this.props.setLoggedInUser(response.data[0]);
          });
        })
      })

      
    }

    findUserUsingUserName = (event) =>{
      let e = event.target.value;
      console.log(e);
      if(e.length>0 && e!==this.props.loggedInUser.userName){
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/user/getUserByUserName/`+e).then((res)=>{
            console.log(res.data);
            if(res.data.length>0){
              this.setState({
                data: res.data
              })
            }
            else{
              this.setState({
                data:[]
              })
            }
        })
      }
      else if(e===this.props.loggedInUser.userName){
        message.error(`Oop, You are at wrong way. Visit "My Account" section to checkout your profile`);
      }
    }

    showDrawerProfile = () => {
      
      this.setState({
        visibleProfileDw: true,
      });
    };
  
    onClose = () => {
      this.setState({
        visible: false,
        selectedIdMenu:"2"
      });
    };

    uploadToGCP =({ fileList })=>{
      console.log('Aliyun OSS:', fileList);
    //  let upload =  storageRef.child('posts/mountains.jpg').put(file);
    //  console.log(upload);
    }

  

    onPictureChange = ({ fileList }) => {
      const { onChange } = this.props;
      console.log('Aliyun OSS:', fileList);
      if (onChange) {
        onChange([...fileList]);
      }
      this.setState({
        pictureToUpload: fileList[0]
      })
    };

    render() {

      const props = {
        name: 'file',
        multiple: false,
        action:this.uploadToGCP,
        onChange: this.onPictureChange
      };


      const { placement, visibleProfileDw } = this.state;
        const menuSearch = (
          <Menu>

            {this.state.data.map((user)=>{
              return <Menu.Item>
              <a  onClick={()=>this.showDrawerProfile()}>
                {user.firstName}
              </a>
            </Menu.Item>;
            })}
          </Menu>
        )

        const menu = (
            <Menu>
              <Menu.Item>
                <a  onClick={()=>this.signOut()}>
                  Logout
                </a>
              </Menu.Item>
              <Menu.Item>
                <a target="_blank" rel="noopener noreferrer" href="#">
                  Contact us
                </a>
              </Menu.Item>
              <Menu.Item>
                <a target="_blank" rel="noopener noreferrer" href="#">
                  Who are we?
                </a>
              </Menu.Item>
            </Menu>
        )
        return (
            <div>
                <div className="header">
                     <img  style={{height:"40px", float:"left", marginLeft:"60px",marginTop:"10px"}} src={LogoImg} />
                     <p className="header-logo-name">CollegeBook</p>
                     {this.props.showSearchBar &&
                      <Dropdown overlay={menuSearch} trigger={['click']}>
                        <div className="searchBar"> <Input
                      placeholder="Search user with their username"
                      
                      onChange={(e)=>this.findUserUsingUserName(e)}
                      // data={this.state.data}
                      // callback={record => console.log(record)}
                      // onSelect={(e)=>console.log(e)}
                    
                       /></div>
                    </Dropdown>
                    
                    } 



                     <div className="avatar-name-div">
                    
                     <Button onClick={this.showDrawer} className="create-new-post" type="dashed" size="40">
                        Create New Post
                        </Button>
        <p className="avatar-name">Hi, {this.props.loggedInUser.firstName} {this.props.loggedInUser.lastName}</p>
                        <Dropdown overlay={menu}>
                        <Avatar className="avatar" size={44} icon={<UserOutlined />} /></Dropdown>
                        
                     </div>
                </div> 

               
                <Drawer
          title="Create a new post"
          width={720}
          onClose={this.onClose}
          visible={this.state.visible}
          bodyStyle={{ paddingBottom: 80 }}
          footer={
            <Spin spinning={this.state.postSpin}>
            <div
              style={{
                textAlign: 'right',
              }}
            >
              <Button onClick={this.onClose} style={{ marginRight: 8 }}>
                Cancel
              </Button>
              <Button onClick={()=>this.onhandleCreatePost()} type="primary">
                Submit
              </Button>
            </div></Spin>
          }
        >
          <Form layout="vertical" hideRequiredMark>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="location"
                  label="Location"
                  rules={[{ required: false, message: 'Please enter location' }]}
                >
                  <Input onChange={(e)=>this.onhandleAddLocation(e)} placeholder="Please enter location" />
                </Form.Item>
              </Col>
              {/* <Col span={12}>
                <Form.Item
                  name="url"
                  label="Url"
                  rules={[{ required: true, message: 'Please enter url' }]}
                >
                  <Input
                    style={{ width: '100%' }}
                    addonBefore="http://"
                    addonAfter=".com"
                    placeholder="Please enter url"
                  />
                </Form.Item>
              </Col> */}

            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="owner"
                  label="Post by"
                  rules={[{ required: true, message: 'Please select an owner' }]}
                >
                  <Select onSelect={()=>this.onhandleSelectAuthor()} placeholder="Please select an owner" >
            <Option  value={this.props.loggedInUser.userId.toString()}>{this.props.loggedInUser.firstName} {this.props.loggedInUser.lastName}</Option>
                    {/* <Option value="anonymous">Anonymous</Option> */}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="type"
                  label="Type"
                  rules={[{ required: true, message: 'Please choose the type' }]}
                >
                  <Select onChange={(value)=>this.onhadleSelecType(value)} placeholder="Please choose the type">
                    {/* <Option value="private">Private</Option> */}
                    <Option value="public">Public</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            {/* <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="approver"
                  label="Approver"
                  rules={[{ required: true, message: 'Please choose the approver' }]}
                >
                  <Select placeholder="Please choose the approver">
                    <Option value="jack">Jack Ma</Option>
                    <Option value="tom">Tom Liu</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="dateTime"
                  label="DateTime"
                  rules={[{ required: true, message: 'Please choose the dateTime' }]}
                >
                  <DatePicker.RangePicker
                    style={{ width: '100%' }}
                    getPopupContainer={trigger => trigger.parentNode}
                  />
                </Form.Item>
              </Col>
            </Row> */}
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item
                  name="caption"
                  label="Caption"
                  rules={[
                    {
                      required: false,
                      message: 'Please enter your caption',
                    },
                  ]}
                >
                  <Input.TextArea onChange={(e)=>this.onhandleCaption(e)} rows={4} placeholder="Please enter your caption" />
                </Form.Item>
              </Col>
            </Row>
            <Dragger {...props}>
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">Click or drag file to this area to upload</p>
              <p className="ant-upload-hint">
               Strictly prohibit from uploading illegal data or other
                banned files.
              </p>
            </Dragger>
          </Form>
          
        </Drawer>
        <Drawer
          className = "drawer"
          title="Profile Details"
          placement={placement}
          closable={true}
          onClose={this.onCloseDw}
          visible={visibleProfileDw}
          key={placement}
        >
         <div> <MDBRow>
            <MDBCol size="3">

            {this.state.data.length>0 && <ProfileLeft loggedInUser={this.props.loggedInUser} setLoggedInUser = {this.props.setLoggedInUser} fromHeader={true} myposts={this.state.data[0].posts} User={this.state.data[0]}/>}
            </MDBCol>
            <MDBCol size="9">
            {/* <ProfileLeft/> */}
            {this.state.data.length>0 && this.state.data[0].type && !this.state.data[0].followers.includes(this.props.loggedInUser.userId) && <div className="blurProfileFromHeader"><ProfileRight loggedInUser={this.props.loggedInUser} setLoggedInUser = {this.props.setLoggedInUser} fromHeader={true} myposts={this.state.data[0].posts} User={this.state.data[0]}/></div>}
            {this.state.data.length>0 && this.state.data[0].type && this.state.data[0].followers.includes(this.props.loggedInUser.userId) && <div className=""><ProfileRight loggedInUser={this.props.loggedInUser} setLoggedInUser = {this.props.setLoggedInUser} fromHeader={true} myposts={this.state.data[0].posts} User={this.state.data[0]}/></div>}
            {this.state.data.length>0 && !this.state.data[0].type  &&  <div className=""><ProfileRight loggedInUser={this.props.loggedInUser} setLoggedInUser = {this.props.setLoggedInUser} fromHeader={true} myposts={this.state.data[0].posts} User={this.state.data[0]}/></div>}

            </MDBCol>
          </MDBRow></div>

          
        </Drawer>
            </div>
        )
    }
}

export default Header
