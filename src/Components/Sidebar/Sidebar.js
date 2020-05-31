import React, { Component } from "react";
import PropTypes from "prop-types";
import "./Sidebar.css";
import { Layout, Menu } from "antd";
import { Drawer, Button, Radio, Space } from 'antd';
import { PictureComponent } from './../PictureComponent/PictureComponent';
import {

  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  ContainerTwoTone,
  ApiTwoTone,
  EyeTwoTone,
  SmileTwoTone,
} from "@ant-design/icons";
import ProfileLeft from "../ProfileStatsComponent/ProfileLeft";
import { MDBRow, MDBCol } from "mdbreact";
import ProfileRight from "../ProfileStatsComponent/ProfileRight";

const { Header, Content, Footer, Sider } = Layout;
export class Sidebar extends Component {
  static propTypes = {};
  constructor(props){
    super(props);
    this.state={
      myPosts:[],
      visible: false,
       placement: 'bottom',
       selectedIdMenu:"1"
    }
  }

  componentDidMount(){
    this.props.setsearchBar(false);
  }

  showDrawer = () => {
    this.props.setsearchBar(false);
    this.setState({
      visible: true,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
      selectedIdMenu:"2"
    });
  };

  componentWillReceiveProps(props){
    // if(props.myPosts!==this.props.myPosts){
      this.setState({
        myPosts:props.myPosts
      })
    // }
  }

  timeline = () =>{
    this.props.setsearchBar(false);
  }

  askanything = ()=>{
    this.props.setsearchBar(false);
  }

  findPeople =()=>{
    this.props.setsearchBar(true);
  }

  setMyPosts = (posts)=>{
    this.setState({
      myPosts:posts
    })
  }

  render() {
    const { placement, visible } = this.state;
    const posts = this.state.myPosts.map((post,key)=>{
        return <PictureComponent key={key} loggedInUser={this.props.loggedInUser} post={post}/>
    })
    return (
      <Layout className="layout">
        <Sider
        className="sidebarbg"
          breakpoint="lg"
          collapsedWidth="0"
          onBreakpoint={(broken) => {
            console.log(broken);
          }}
          onCollapse={(collapsed, type) => {
            console.log(collapsed, type);
          }}
        >
          <div className="logo" />
          <Menu className="menubg" theme="" mode="inline" defaultSelectedKeys={this.state.selectedIdMenu}>
            <Menu.Item onClick={()=>this.timeline()} key="1" icon={<ContainerTwoTone />}>
              Timeline
            </Menu.Item>
            <Menu.Item disabled onClick={()=>this.askanything()} key="2" icon={<ApiTwoTone />}>
              Ask Anything
            </Menu.Item>
            <Menu.Item onClick={()=>this.findPeople()} key="3" icon={<EyeTwoTone />}>
              Find People
            </Menu.Item>
            <Menu.Item onClick={this.showDrawer} key="4" icon={<SmileTwoTone />}>
              Your Account
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout style={{width:"700px"}}>
          {/* <Header
            className="site-layout-sub-header-background"
            style={{ padding: 0 }}
          /> */}
          <Content style={{ margin: "0px 16px 0", width:"700px"}}>
            <div
              className="site-layout-background"
              style={{ padding:24, minHeight: 360 }}
            >
             {posts}

            </div>
            
          </Content>
          
          <Footer style={{ textAlign: "center" }}>
            CollegeBook ©2020 Created by P&D 
          </Footer>
        </Layout>
        <Drawer
          className = "drawer"
          title="My Profile"
          placement={placement}
          closable={true}
          onClose={this.onClose}
          visible={visible}
          key={placement}
        >
         <div> <MDBRow>
            <MDBCol size="3">
            <ProfileLeft myposts={this.state.myPosts} User={this.props.loggedInUser}/>
            </MDBCol>
            <MDBCol size="9">
            {/* <ProfileLeft/> */}
            {this.props.loggedInUser!==undefined && <ProfileRight setMyPosts={this.setMyPosts} User={this.props.loggedInUser}/>}
            </MDBCol>
          </MDBRow></div>

          
        </Drawer>
      </Layout>
    );
  }
}

export default Sidebar;
