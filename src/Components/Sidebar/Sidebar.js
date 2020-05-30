import React, { Component } from "react";
import PropTypes from "prop-types";
import "./Sidebar.css";
import { Layout, Menu } from "antd";
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

const { Header, Content, Footer, Sider } = Layout;
export class Sidebar extends Component {
  static propTypes = {};

  render() {
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
          <Menu className="menubg" theme="" mode="inline" defaultSelectedKeys={["1"]}>
            <Menu.Item  key="1" icon={<ContainerTwoTone />}>
              Timeline
            </Menu.Item>
            <Menu.Item key="2" icon={<ApiTwoTone />}>
              Ask Anything
            </Menu.Item>
            <Menu.Item key="3" icon={<EyeTwoTone />}>
              Find People
            </Menu.Item>
            <Menu.Item key="4" icon={<SmileTwoTone />}>
              Your Account
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout style={{width:"700px"}}>
          {/* <Header
            className="site-layout-sub-header-background"
            style={{ padding: 0 }}
          /> */}
          <Content style={{ margin: "24px 16px 0", width:"700px" }}>
            <div
              className="site-layout-background"
              style={{ padding: 24, minHeight: 360 }}
            >
              <PictureComponent loggedInUser={this.props.loggedInUser}/>
            </div>
            
          </Content>
          
          <Footer style={{ textAlign: "center" }}>
            CollegeBook ©2020 Created by P&D 
          </Footer>
        </Layout>
      </Layout>
    );
  }
}

export default Sidebar;
