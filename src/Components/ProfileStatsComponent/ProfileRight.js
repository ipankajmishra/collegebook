import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Row, Col, Divider } from 'antd';
import { Modal, Button } from 'antd';
import "./ProfileRight.css";
import PictureComponent from '../PictureComponent/PictureComponent';
// const style = { background: '#0092ff', padding: '8px 0' };
export class ProfileRight extends Component {
    constructor(props){
      super(props);
      this.state={
        visible: false ,
        post:{}
      }
    }

    showModal = (post,e) => {
      e.preventDefault();
      this.setState({
        visible: true,
        post:post
      });
     
    };

    handleOk = e => {
      console.log(e);
      this.setState({
        visible: false,
      });
    };
  
    handleCancel = e => {
      console.log(e);
      this.setState({
        visible: false,
      });
    };

    render() {
      const picturesPosts = this.props.User!==undefined ? this.props.User.posts.map((post)=>{
        return <Col className="gutter-row" span={6}>
          
        <div className="myprofile-post"><img onClick={(e)=>this.showModal(post,e)} style={{height:"140px", width:"217px"}} src={post.imgUrl}/></div>
      </Col>;
      }) : <div></div>
        if(this.props.User !==undefined && this.props.User!==null)
        {return (
            <div className="right-myprofile">
                <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                  {picturesPosts}
                  <div className="modal-specific-pic" style={{minHeight:"100px"}}>
            <div>
              
                <Modal
                  // title="Basic Modal"
                  visible={this.state.visible}
                  onOk={this.handleOk}
                  onCancel={this.handleCancel}
                  footer={null}
                >
                  <PictureComponent  User={this.props.User} post={this.state.post} fromProfile={true}/>
                </Modal>
              </div>
              </div>
    </Row>
            
            </div>
        )}
        else{
          return (<div>No data</div>)
        }
    }
}

export default ProfileRight
