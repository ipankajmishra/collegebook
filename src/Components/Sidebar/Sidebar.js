import React, { Component } from "react";
import PropTypes from "prop-types";
import "./Sidebar.css";
import { Layout, Menu } from "antd";
import { Drawer, Button, Radio, Space,BackTop  } from 'antd';
import InfiniteScroll from 'react-infinite-scroller';
import { List, message, Avatar, Spin } from 'antd';
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
import axios from "axios";
import { AiFillHeart } from "react-icons/ai";
const style = {
  height: 40,
  width: 40,
  lineHeight: '40px',
  borderRadius: 4,
  backgroundColor: '#1088e9',
  color: '#fff',
  textAlign: 'center',
  fontSize: 14,
};
const { Header, Content, Footer, Sider } = Layout;
export class Sidebar extends Component {
  static propTypes = {};
  constructor(props){
    super(props);
    this.state={
      myPosts:[],
      visible: false,
       placement: 'bottom',
       selectedIdMenu:"1",
       User:{},
       data:[],
       postMap:new Map(),
       loading: false,
       hasMore: true,
       index: 0,
       count:0,
       postArray:[]
    }
    // this.myOverallFunction();
  }

  componentDidMount(){
    this.props.setsearchBar(false);
    // axios.get(`${process.env.REACT_APP_BACKEND_URL}/user/timeline`,this.state.User).then((res)=>{
    //   console.log(res.data);
    //   this.setState({
    //     postArray: res.data
    //   })
    // })

  //   let posts = this.state.postArray;
  //       let array = this.state.myPosts;
  //       posts = posts.slice(this.state.index,this.state.index + 3);
  //       let myMap = new Map();
  //       array.map((post,key)=>{
  //         myMap.set(post.postId,key);
  //       })
  //       this.setState({
  //         postMap:myMap,
  //         data:this.state.data.concat(posts),
          
  //         count:this.state.count+1
  //       })
  }

  callmeinStarting = ()=>{
    
    let posts = this.state.postArray;
    console.log(posts);
    let array = this.state.myPosts;
    if(this.state.postArray.length>10){
      posts = posts.slice(this.state.index,this.state.index + 10);
    }
    else{
      posts = this.state.postArray;
    }
    
    let myMap = new Map();
    array.map((post,key)=>{
      myMap.set(post.postId,key);
    })
    this.setState({
      postMap:myMap,
      data:posts,
      
      count:this.state.count+1
    },()=>{
      console.log(this.state.data);
      document.getElementById("backtotop").click();
    })
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
    console.log("hello")
    
      console.log("postArray",props.postArray)

      if(props!==this.props){
        this.setState({
          User:props.loggedInUser,
          myPosts:props.myPosts,
          postArray:props.postArray
        },()=>{
        //   let posts = this.state.myPosts;
        //   if(posts !==undefined || posts !== null)
        // {
          this.callmeinStarting();
        // } 
        })
      }
     
    // }
  }

  timeline = () =>{
    this.props.setLoggedInUser(this.state.User);
    this.props.setsearchBar(false);
  }

  askanything = ()=>{
    this.props.setsearchBar(false);
  }

  findPeople =()=>{
    this.props.setsearchBar(true);
  }

  // setMyPosts = (posts)=>{
  //   let user = this.state.User;
  //   user.posts = posts;
  //   this.setState({
  //     myPosts:posts,
  //     User:user
  //   })
  // }


  handleInfiniteOnLoad = () => {
    console.log("Infinite loading")
    let { data } = this.state;
    this.setState({
      loading: true,
    },()=>this.loadingMorePosts());
    // if (data.length > 14) {
    //   message.warning('Infinite List loaded all');
    //   this.setState({
    //     hasMore: false,
    //     loading: false,
    //   });
    //   return;
    // }
    // let array = this.state.myPosts;
    if(this.state.data.length + 10 >= this.state.postArray.length && this.state.hasMore)
    {
       let array1 = this.state.postArray;
        message.warning('No new Posts available');
        this.setState({
          data : array1,
          hasMore: false,
          loading: false,
          index:this.state.index + 10
        });
        return;
    }
    else{
      let array = this.state.postArray.slice(this.state.index,this.state.index + 10);
      this.setState({
        data : this.state.data.concat(array),
        loading: false,
        index: this.state.index + 10
      });
    }
    
      // data = data.concat(res.results);
     
    
  };

  loadingMorePosts = () => {
    const hide = message.loading('Loading more posts..', 0);
    // Dismiss manually and asynchronously
    setTimeout(hide, 1000);
  };

  render() {
    const { placement, visible } = this.state;
    const posts = this.state.data.map((post,key)=>{
        return <PictureComponent key={key} User={this.props.loggedInUser} post={post}/>
        
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
              className="site-layout-background demo-infinite-container"
              style={{ padding:24, minHeight: 360 }}
            >
              <InfiniteScroll
          initialLoad={false}
          pageStart={0}
          loadMore={()=>this.handleInfiniteOnLoad()}
          hasMore={!this.state.loading && this.state.hasMore}
          useWindow={false}
        >
             {posts}
            <BackTop>
              <div id="backtotop" style={style}>Back to top</div>
            </BackTop>
            
             </InfiniteScroll>

            </div>
            
          </Content>
          
          <Footer style={{ textAlign: "center" }}>
            CollegeBook ©2020 Made with <AiFillHeart className="madewithlove" style={{color:"red"}}/> by a <strong>Vitian</strong>
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
            {this.props.loggedInUser!==undefined && <ProfileLeft fromHeader={false} myposts={this.props.loggedInUser.posts} User={this.props.loggedInUser}/>}
            </MDBCol>
            <MDBCol size="9">
            {/* <ProfileLeft/> */}
            {this.props.loggedInUser!==undefined && <ProfileRight fromHeader={false} postMap={this.state.postMap} setMyPosts={this.props.setMyPosts} myposts={this.state.myPosts} User={this.state.User}/>}
            </MDBCol>
          </MDBRow></div>

          
        </Drawer>
        {/* <Footer style={{ textAlign: "center" , height:"10vh"}}>
            CollegeBook ©2020 Made with <AiFillHeart className="madewithlove" style={{color:"red"}}/> by a <strong>Vitian</strong>
          </Footer> */}
      </Layout>
    );
  }
}

export default Sidebar;
