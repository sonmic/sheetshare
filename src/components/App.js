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
import { storage } from "../firebase";
import LinearProgress from "@material-ui/core/LinearProgress";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      blurb: "",
      instrument: "",
      genre: "",
      file: null,
      progress: 0
    };
    //bind
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
            {this.props.user != null ? (
              <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                  <input
                    onChange={this.handleChange}
                    value={this.state.title}
                    type="text"
                    name="title"
                    className="form-control no-border"
                    placeholder="Song Title..."
                    required
                  />
                </div>
                <div className="form-group">
                  <select
                    className="form-control"
                    id="instrumentSelect"
                    onChange={this.handleChange}
                    value={this.state.instrument}
                    name="instrument"
                    required
                  >
                    <option>Select an Instrument...</option>
                    <option>Banjo</option>
                    <option>Bass</option>
                    <option>Bassoon</option>
                    <option>Cello</option>
                    <option>Clarinet</option>
                    <option>Drums</option>
                    <option>Electric Bass</option>
                    <option>Electric Guitar</option>
                    <option>Flute</option>
                    <option>French Horn</option>
                    <option>Guitar</option>
                    <option>Mandolin</option>
                    <option>Piano</option>
                    <option>Saxophoe</option>
                    <option>Trumpet</option>
                    <option>Tuba</option>
                    <option>Ukulele</option>
                    <option>Viola</option>
                    <option>Violin</option>
                  </select>
                </div>
                <div className="form-group">
                  <select
                    className="form-control"
                    id="genreSelect"
                    onChange={this.handleChange}
                    value={this.state.genre}
                    name="genre"
                    required
                  >
                    <option>Select the Genre...</option>
                    <option>Classical</option>
                    <option>Country</option>
                    <option>Folk</option>
                    <option>Latino</option>
                    <option>Jazz</option>
                    <option>Pop</option>
                    <option>Reggae</option>
                    <option>Rock</option>
                    <option>Rhythm and Blues</option>
                    <option>Soul</option>
                  </select>
                </div>
                <div className="form-group">
                  <textarea
                    onChange={this.handleChange}
                    value={this.state.blurb}
                    type="text"
                    name="blurb"
                    className="form-control no-border"
                    placeholder="About this Song..."
                    required
                  />
                </div>
                <LinearProgress
                  variant="determinate"
                  value={this.state.progress}
                />
                <input
                  type="file"
                  name="file"
                  onChange={e => this.setState({ file: e.target.files[0] })}
                />
                <div className="form-group">
                  <button className="btn btn-primary col-sm-12">Submit</button>
                </div>
              </form>
            ) : null}
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
