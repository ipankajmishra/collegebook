import React, { Component } from 'react'
import PropTypes from 'prop-types'
import "./ProfileLeft.css";
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Statistic, Row, Col, Button } from 'antd';
export class ProfileLeft extends Component {
    constructor(props){
        super(props);
        this.state={

        }
    }

    render() {
        if(this.props.User !==undefined && this.props.User!==null){
            return (
                <div className="profile-left">
                  
                  <Row gutter={16}>
                    <Col span={12}>
                    <div className="avatar-myprofile">
                     <Avatar size={164} icon={<UserOutlined />} />
                  <p className="myprofile-name">{this.props.User.firstName} {this.props.User.lastName}</p>
                  </div>
                    </Col>
                    <Col className="colten" span={12}>
                       
                        <Statistic title="Total Posts" value={this.props.myposts.length} />
                     <Statistic text-center title="Followers" value={this.props.User.followers.length} />
                        
                        <Statistic title="Following" value={this.props.User.following.length} />
                    
                    </Col>
                </Row>
                <p className="bio-my-profile">{this.props.User.bio}</p>
                </div>
            )
        }
        else{
            return(<div>No data</div>)
        }
        
    }
}

export default ProfileLeft
