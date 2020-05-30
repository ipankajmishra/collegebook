import React, { Component } from 'react'
import PropTypes from 'prop-types'
import LogoImg from '../../images/icons/school-bag.svg';
import "./Header.css";
import firebase from "../../firebase";
import { Drawer, Form, Col, Row, Input, Select, DatePicker, Upload,message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { InboxOutlined } from '@ant-design/icons';



import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Menu, Dropdown, Button } from 'antd';
import { DownOutlined } from '@ant-design/icons';
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
          visible: false
        }
    }

    
    showDrawer = () => {
      this.setState({
        visible: true,
      });
    };
  
    onClose = () => {
      this.setState({
        visible: false,
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

    render() {
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
              <Button onClick={this.onClose} type="primary">
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
                  <Input placeholder="Please enter location" />
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
                  <Select placeholder="Please select an owner" defaultValue="pankaj">
                    <Option  value="pankaj">Pankaj Mishra</Option>
                    <Option value="anonymous">Anonymous</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="type"
                  label="Type"
                  rules={[{ required: true, message: 'Please choose the type' }]}
                >
                  <Select placeholder="Please choose the type" defaultValue="public">
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
                  name="description"
                  label="Description"
                  rules={[
                    {
                      required: true,
                      message: 'Please enter your description',
                    },
                  ]}
                >
                  <Input.TextArea rows={4} placeholder="Please enter your description" />
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
            </div>
        )
    }
}

export default Header
