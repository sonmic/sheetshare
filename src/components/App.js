import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { getPosts, savePosts, deletePost} from '../actions/postAction';
import PostCard  from './PostCard';
import { getUser } from '../actions/userAction';






class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      blurb: "",
      instrument:"",
      genre:"",
      
    };
    //bind
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderPosts = this.renderPosts.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    
  }

  // lifecycle methods
  componentDidMount() {
   this.props.getPosts();
   this.props.getUser();
  }
  // }
  handleDelete(id){
    this.props.deletePost(id);
    this.props.getPosts();
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  
  }
  // handle submit
  handleSubmit(e) {
    e.preventDefault();
    const post = {
      title: this.state.title,
      blurb: this.state.blurb,
      instrument: this.state.instrument,
      genre: this.state.genre
    }
    console.log(post);
    this.props.savePosts(post);
    this.props.getPosts();
    this.setState({
      title:'',
      blurb:'',
      instrument:'',
      genre:''
    })
  }

  //render posts
  renderPosts(){
    return _.map(this.props.posts, (post, key) => {
      return(
        <PostCard 
        key={key} 
        title={post.title}
        instrument={post.instrument} 
        genre={post.genre}
        blurb={post.blurb} 
        onClick={() => this.handleDelete(key)}>
        </PostCard>
       
      )
    })
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-6 col-sm-offset-3">
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <input
                  onChange={this.handleChange}
                  value={this.state.title}
                  type="text"
                  name="title"
                  className="form-control no-border"
                  placeholder="Song Title..."
                  required />
              </div>
              <div className="form-group">
              <input
                  onChange={this.handleChange}
                  value={this.state.instrument}
                  type="text"
                  name="instrument"
                  className="form-control no-border"
                  placeholder="Instrument..."
                  required />
              </div>
              <div className="form-group">
              <input
                  onChange={this.handleChange}
                  value={this.state.genre}
                  type="text"
                  name="genre"
                  className="form-control no-border"
                  placeholder="Genre..."
                  required />
              </div>

              <div className="form-group">
                <textarea
                  onChange={this.handleChange}
                  value={this.state.blurb}
                  type="text"
                  name="blurb"
                  className="form-control no-border"
                  placeholder="About this Song..."
                  required />
              </div>
              <div className="form-group">
                <button className="btn btn-primary col-sm-12">Submit</button>
              </div>
            </form>
            {(this.props.user != null)? this.renderPosts():null}
          </div>
        </div>
      </div>
    );
  }

}

function mapStateToProps(state, ownProps){
  return{
    posts: state.posts,
    user: state.user
  }
}

export default connect(mapStateToProps, { getPosts, savePosts, deletePost, getUser})(App);
