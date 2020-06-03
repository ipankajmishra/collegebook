import React, { Component } from 'react'
import PropTypes from 'prop-types'
import "./ProfileLeft.css";
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Statistic, Row, Col, Button,Switch  } from 'antd';
import axios from 'axios';
export class ProfileLeft extends Component {
    constructor(props){
        super(props);
        this.state={
            lu:this.props.loggedInUser,
            u:this.props.User,
            showUnfollow:false,
            addOne:0,
            subtractone:0,
            addfollower:0
            // myfollowers:this.props.User.followers.length,
            // myfollowing:this.props.User.following.length

        }
        // this.setState({
        //     myfollowers:this.state.u.followers.length,
        //     myfollowing:this.state.u.following.length
        // })
      
        // console.log("loggedIn",this.props.loggedInUser);
        // console.log("User",this.props.User)
    }

    followUser = () =>{
        let user = this.props.loggedInUser;
        let following = user.following;
        following[following.length] = this.props.User.userId;
        user.following = following;
        let formdata = user;
        axios.put(`${process.env.REACT_APP_BACKEND_URL}/user/updateUserPosts`,formdata).then((res)=>{
                console.log(res.data);
                this.setState({
                    showUnfollow:true,
                    // myfollowers:this.state.myfollowers + 1
                    addfollower:1
                },()=>{
                    this.props.setLoggedInUser(user);
                    let usersecond = this.props.User;
                    let followers = usersecond.followers;
                    followers[followers.length] = this.props.loggedInUser.userId;
                    usersecond.followers = followers;
                    let formdataTwo = usersecond;
                    axios.put(`${process.env.REACT_APP_BACKEND_URL}/user/updateUserPosts`,formdataTwo).then((response)=>{
                        console.log(response.data);
                    })
                })
        })
    }

    unfollowUser = () =>{
        let user = this.props.loggedInUser;
        let following = user.following;
        // following[following.length] = this.props.User.userId;
        let index = following.indexOf(this.props.User.userId);
        if (index > -1) {
            following.splice(index, 1);
          }
        user.following = following;
        let formdata = user;
        axios.put(`${process.env.REACT_APP_BACKEND_URL}/user/updateUserPosts`,formdata).then((res)=>{
                console.log(res.data);
                this.setState({
                    showUnfollow:true,
                    // myfollowers:this.state.myfollowers - 1
                    addfollower:-1
                },()=>{
                    this.props.setLoggedInUser(user);
                    let usersecond = this.props.User;
                    let followers = usersecond.followers;
                    // followers[length] = this.props.loggedInUser.userId;
                    let index = followers.indexOf(this.props.loggedInUser.userId);
                    if (index > -1) {
                        followers.splice(index, 1);
                    }
                    usersecond.followers = followers;
                    let formdataTwo = usersecond;
                    axios.put(`${process.env.REACT_APP_BACKEND_URL}/user/updateUserPosts`,formdataTwo).then((response)=>{
                        console.log(response.data);
                    })
                })
        })
    }

    setPublic =(e) =>{
        console.log(e);
        console.log(e);
        let user = this.props.User;
        user.type = false;
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/user/addNewUser`,user).then((res)=>{
            console.log(res.data);
        })
    }

    setPrivate=(e)=>{
        console.log(e);
        let user = this.props.User;
        user.type = true;
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/user/addNewUser`,user).then((res)=>{
            console.log(res.data);
        })
    }

    render() {
        if(this.props.User !==undefined && this.props.User!==null){
            return (
                <div className="profile-left">
                  
                  <Row gutter={16}>
                    <Col span={12}>
                    <div className="avatar-myprofile">
                     <Avatar size={164} icon={<UserOutlined />} />
            {this.props.User.type && <div className="nameWithToggle"><p className="myprofile-name">{this.props.User.firstName} {this.props.User.lastName} </p>{!this.props.fromHeader && this.props.User.type && <Switch size="small" className="toggleButton" defaultChecked onChange={(e)=>this.setPublic(e)} />}</div> }
            {!this.props.User.type && <div className="nameWithToggle"><p className="myprofile-name">{this.props.User.firstName} {this.props.User.lastName} </p>{!this.props.fromHeader && !this.props.User.type && <Switch size="small" className="toggleButton"  onChange={(e)=>this.setPrivate(e)} />}</div> }

                  </div>
                    </Col>
                    <Col className="colten" span={12}>
                       
                        {this.props.fromHeader && <><Statistic title="Total Posts" value={this.props.User.posts.length} />
                     <Statistic text-center title="Followers" value={this.props.User.followers.length} />
                        
                        <Statistic title="Following" value={this.props.User.following.length} /></>}
                        {!this.props.fromHeader && <><Statistic title="Total Posts" value={this.props.User.posts.length} />
                     <Statistic text-center title="Followers" value={this.props.User.followers.length} />
                        
                        <Statistic title="Following" value={this.props.User.following.length} /></>}
                    </Col>
                </Row>
                <p className="bio-my-profile">{this.props.User.bio}</p>
                {this.props.fromHeader && !this.props.loggedInUser.following.includes(this.props.User.userId) && <Button onClick={()=>this.followUser()} block className="follow-button" type="primary">Follow</Button>}
                {this.props.fromHeader && this.props.loggedInUser.following.includes(this.props.User.userId) && <Button onClick={()=>this.unfollowUser()} block  className="follow-button" type="dashed">Unfollow</Button>}
                {/* {this.state.showUnfollow && <Button onClick={()=>this.unfollowUser()} block  className="follow-button" type="dashed">Unfollow</Button>} */}

                </div>
            )
        }
        else{
            return(<div>No data</div>)
        }
        
    }
}

export default ProfileLeft
