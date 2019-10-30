import React from "react";
import { connect } from "react-redux";
import PostCard from "../components/PostCard";
import _ from "lodash";
import "./style.css";
import logo from "./logo192.png";

import { getPosts, allPosts } from "../actions/postAction";
import { style } from "@material-ui/system";
class SearchBar extends React.Component {
    state ={name:""}
  componentDidMount() {
      
    this.props.allPosts();
    console.log(this.props.posts);
  }
   //render posts
   renderPosts() {
    console.log(this.props.posts);
    return _.map(this.props.posts, (post, key) => {

    /*let searchterm = this.state.name;
    let array = this.props.posts;
    
    const searchFilter = (searchterm, arr) => {
      let term = searchterm.toLowerCase();
      return this.props.posts
    }*/

    if ( this.state.name === post.instrument || this.state.name === post.title || this.state.name === post.genre ){
      
    
      return (
        <PostCard
          key={key}
          title={post.title}
          instrument={post.instrument}
          genre={post.genre}
          blurb={post.blurb}
          link={post.link}
        ></PostCard>
      );
    } 
    });
  }


  render() {
      console.log(this.props)
    
    console.log(this.state)
    return (
      <div>
      <div class="logo-parent">
        <img src={logo} class="logo-child"/>
        <form class="form-inline my-2 my-lg-0">

          <input
            class="form-control mr-sm-2"
            type="search"
            placeholder="Search"
            aria-label="Search"

            name= "name"
            onChange={(event)=>{
                event.preventDefault()
                let name = event.target.name
                let value = event.target.value
                this.setState({[name]:value})
            }}
          />
          <button style={{display:"none"}} class="search" onClick={(event)=>{
              event.preventDefault()
            console.log(this.state.name)
          }}type="submit">
            Search
          </button>
        </form>
        </div>
        {this.props.posts != null ? this.renderPosts() : null}
         
      </div>
    );
  }
}
function mapStateToProps(state, ownProps) {
  return {
    posts: state.posts
  };
}

export default connect(
  mapStateToProps,
  { allPosts, getPosts }
)(SearchBar);
