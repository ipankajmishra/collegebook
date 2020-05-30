import React, { Component } from 'react'
import PropTypes from 'prop-types'
import LogoImg from '../../images/icons/school-bag.svg';
import "./Header.css";
import firebase from "../../firebase";

import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Menu, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';

export class Header extends Component {
    constructor(props){
        super(props);
    }

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
        <p className="avatar-name">Hi, {this.props.loggedInUser.firstName} {this.props.loggedInUser.lastName}</p>
                        <Dropdown overlay={menu}>
                        <Avatar className="avatar" size={44} icon={<UserOutlined />} /></Dropdown>
                        
                     </div>
                </div> 
            </div>
        )
    }
}

export default Header
