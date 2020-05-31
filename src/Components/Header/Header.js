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
import { Menu, Dropdown, Button } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import ProfileLeft from "../ProfileStatsComponent/ProfileLeft";
import ProfileRight from "../ProfileStatsComponent/ProfileRight";

const { Option } = Select;
const { Dragger } = Upload;
const props = {
  name: 'file',
  multiple: true,
  action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  onChange(info) {
    const { status } = info.file;
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};
export class Header extends Component {
    constructor(props){
        super(props);
        this.state={
          visible: false,
          post:{},
          showSearchBar:false,
          data : [],
          visibleProfileDw: false,
       placement: 'bottom',
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

    componentWillReceiveProps(porps){
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

    onhandleCreatePost = () =>{
      let post = this.state.post;
      post["likeCount"]=0;
      post["shareCount"]=0;
      post["createDate"]=new Date();
      post["likedUsers"]=[];
      post["imgUrl"]="https://www.yourtrainingedge.com/wp-content/uploads/2019/05/background-calm-clouds-747964.jpg";
      this.setState({
        post
      },()=>{
        let formData = {
          "post":this.state.post,
          "mobile":this.props.loggedInUser.mobileNumber
        };
        axios.post('https://www.happyec.in/post/addNewPost', formData)
        .then((response)=> {
          console.log(response.data);
          this.setState({
            visible: false,
          },()=>{
            this.props.setLoggedInUser(response.data);
          });
        })
      })

      
    }

    findUserUsingUserName = (event) =>{
      let e = event.target.value;
      console.log(e);
      if(e.length>0){
        axios.get("https://www.happyec.in/user/getUserByUserName/"+e).then((res)=>{
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

    render() {
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
            </div>
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
                    <Option value="private">Private</Option>
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
            <ProfileLeft  User={this.state.data[0]}/>
            </MDBCol>
            <MDBCol size="9">
            {/* <ProfileLeft/> */}
            <ProfileRight User={this.state.data[0]}/>
            </MDBCol>
          </MDBRow></div>

          
        </Drawer>
            </div>
        )
    }
}

export default Header
