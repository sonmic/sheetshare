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


    this.state = {
      title: "",
      blurb: "",
      instrument:"",
      genre:"",
    };

    //bind
    this.renderPosts = this.renderPosts.bind(this);
  }

  //lifecycle methods 
  componentDidMount() {
    this.props.allPosts();
    this.props.getUser();
  }

  //render posts
  renderPosts() {
    // console.log(this.props.posts);
    return _.map(this.props.aPosts, (post, key) => {
      return (
        <PostCard
          key={key}
          title={post.title}
          link={post.link}
          instrument={post.instrument}
          genre={post.genre}
          blurb={post.blurb}
        ></PostCard>
      );
    });
  }

  render() {
    return <Container maxWidth="lg">{this.renderPosts()}</Container>;
  }
}

function mapStateToProps(state, ownProps) {
  return {
    aPosts: state.aPosts,
    user: state.user
  };
}

export default connect(
  mapStateToProps,
  { allPosts, getUser }
)(AllPosts);
