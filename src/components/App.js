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
import Container from "@material-ui/core/Container";

class App extends Component {
  constructor(props) {
    super(props);

    //bind
    this.renderPosts = this.renderPosts.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  //lifecycle methods
  componentDidMount() {
    this.props.getPosts();
    this.props.getPosts();
    this.props.getUser();  }
  
  handleDelete(id) {
    this.props.deletePost(id);
    this.props.getPosts();
  }


  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  uploadFile() {
    const { file } = this.state;
    console.log("Uploading", file);
    const storageRef = storage.ref("sheets/" + file.name);

    //upload file
    const task = storageRef.put(file);

    //update progress
    const self = this;
    task.on(
      "state_changed",
      function progress(snapshot) {
        const percentage =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Percentage", percentage);
        self.setState({ progress: percentage });
      },
      function error(err) {
        console.log("File upload error", err);
      },

      function complete() {
        console.log("File upload complere");
      }
    );
  }
  //handle submit
  handleSubmit(e) {
    e.preventDefault();
    this.uploadFile();
    const post = {
      title: this.state.title,
      blurb: this.state.blurb,
      instrument: this.state.instrument,
      genre: this.state.genre
    };

    console.log(post);
    this.props.savePosts(post);
    this.props.getPosts();
    this.setState({
      title: "",
      blurb: "",
      instrument: "",
      genre: ""
    });
  }

  //render posts
  renderPosts() {
    console.log(this.props.posts);
    return _.map(this.props.posts, (post, key) => {
      return (
        <PostCard
          key={key}
          title={post.title}
          link={post.link}
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
      <Container maxWidth="sm">
        {this.props.user != null ? <SubmitForm /> : null}
        {this.props.user != null ? this.renderPosts() : null}
      </Container>
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
