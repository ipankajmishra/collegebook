import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Card, Avatar } from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import moment from "moment";
// import { faThumbsUp, faThumbsDown, faHeart, faComment, faPaperPlane } from '@fortawesome/free-regular-svg-icons'
import { UserOutlined } from '@ant-design/icons';
import { AiOutlineHeart } from 'react-icons/ai';
import { FiMessageCircle } from 'react-icons/fi';
import { RiShareForwardBoxLine } from 'react-icons/ri';
import { BsDot } from 'react-icons/bs';
import "./PictureComponent.css"
export class PictureComponent extends Component {
    constructor(props){
        super(props);
        this.state = {
            title: "First Post",
            content: "This is the content of first post.",
            imgsrc : "https://www.yourtrainingedge.com/wp-content/uploads/2019/05/background-calm-clouds-747964.jpg",
            createdBy : "",
            userName:"",
            avatar:"data:image/jpeg;base64,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"
        }
    }

    componentWillReceiveProps(props){
        if(props.loggedInUser !== this.props.loggedInUser){
            this.setState({
                createdBy:`${props.loggedInUser.firstName} ${props.loggedInUser.lastName}`,
                userName:props.loggedInUser.userName
            })
        }
    }
    

    render() {
        const agotime = moment(this.props.post.createDate).fromNow();
        const  createdBy= !this.props.fromProfile ? `${this.props.loggedInUser.firstName} ${this.props.loggedInUser.lastName}`:`${this.props.User.firstName} ${this.props.User.lastName}`;
        
        return (
            <div className="picture-component-full">
                <Card  bordered={true} style={{textAlign:"left"}}>

                    <div>
                        
                        {/* <img src = {this.state.avatar} style={{display:'inline',height:'18px' , width: '18px' , borderRadius:'50%'}}/> */}
                        <Avatar className="post-avatar"  size={20} icon={<UserOutlined />} />
                    <p style={{display:'inline' , fontSize:'15px' , textAlign:'center'}}>{createdBy}</p>
                    <span className="agoTime">{agotime}</span>
                    </div>
                    {/* <hr /> */}
{this.props.fromProfile &&                    <img src = {this.props.post.imgUrl} style={{marginTop:"10px",maxHeight:"200px",width:"420px"}}/>
}                   
{!this.props.fromProfile &&                    <img src = {this.props.post.imgUrl} style={{marginTop:"10px",maxHeight:"200px",width:"600px"}}/>
} 
                    {/* <br /> */}
                    <div className="post-tools">
                        <div className="left-tools">
                            <AiOutlineHeart onclick={()=>{}} size={30} style={{marginRight:"10px", cursor:"pointer"}}/>
                            <FiMessageCircle onclick={()=>{}} size={30} style={{marginRight:"10px", cursor:"pointer"}}/>

                            <RiShareForwardBoxLine onclick={()=>{}} size={30} style={{marginRight:"10px", cursor:"pointer"}}/>
                        </div>
                        <div className="right-tools">
                           <p>{this.props.post.likeCount} Likes  </p>
                        </div>
                    </div>

                    {/* <button href="#" style={{border:'none' , backgroundColor:'white' , padding:'0px' , margin:'0px 15pxpx 0px 0px'}} ><FontAwesomeIcon icon={faHeart} /></button>
                    <button href="#" style={{border:'none' , backgroundColor:'white' , padding:'0px' , margin:'0px 0px 0px 15px'}} ><FontAwesomeIcon icon={faComment} /></button>
                    <button href="#" style={{border:'none' , backgroundColor:'white' , padding:'0px' , margin:'0px 0px 0px 15px'}} ><FontAwesomeIcon icon={faPaperPlane} /></button> */}
                    <div>
                <p className="post-desc" style={{}}><span style={{fontWeight:"bold", marginRight:"10px"}}>{!this.props.fromProfile?this.props.loggedInUser.userName:this.props.User}</span>{this.props.post.postDescription}</p>
                    </div>

                </Card>
            </div>
        )
    }
}

export default PictureComponent
