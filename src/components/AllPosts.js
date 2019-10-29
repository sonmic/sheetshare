import React, { Component } from "react";
import _ from "lodash";
import { connect } from "react-redux";
import { allPosts } from "../actions/postAction";
import { getUser } from "../actions/userAction";
import PostCard from "./PostCard";
import Container from "@material-ui/core/Container";

class AllPosts extends Component {
  constructor(props) {
    super(props);

    this.state = {};
    //bind
    this.renderPosts = this.renderPosts.bind(this);
  }

  // lifecycle methods
  componentDidMount() {
    this.props.allPosts();
    this.props.getUser();
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
        ></PostCard>
      );
    });
  }

  render() {
    return <Container maxWidth="sm">{this.renderPosts()}</Container>;
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
  { allPosts, getUser }
)(AllPosts);
