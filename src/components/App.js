import React, { Component } from "react";
import _ from "lodash";
import { connect } from "react-redux";
import {
  getPosts,
  savePosts,
  deletePost,
  allPosts
} from "../actions/postAction";
import PostCard from "./PostCard";
import { getUser } from "../actions/userAction";
import SubmitForm from "./SubmitForm";

class App extends Component {
  constructor(props) {
    super(props);

    //bind
    this.renderPosts = this.renderPosts.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  // lifecycle methods
  componentDidMount() {
    //this.props.getPosts();
    this.props.getPosts();
    this.props.getUser();
  }
  //
  handleDelete(id) {
    this.props.deletePost(id);
    this.props.getPosts();
  }

  //render posts
  renderPosts() {
    console.log(this.props.posts);
    return _.map(this.props.posts, (post, key) => {
      return (
        <PostCard
          key={key}
          title={post.title}
          instrument={post.instrument}
          genre={post.genre}
          blurb={post.blurb}
          onClick={() => this.handleDelete(key)}
        ></PostCard>
      );
    });
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            {this.props.user != null ? <SubmitForm /> : null}
            {this.props.user != null ? this.renderPosts() : null}
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    posts: state.posts,
    user: state.user
  };
}

export default connect(
  mapStateToProps,
  { allPosts, getPosts, savePosts, deletePost, getUser }
)(App);
