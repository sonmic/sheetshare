import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getUser, logout } from '../actions/userAction';

class Header extends Component {
    render(){
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
            <Link className="navbar-brand" to="/">Sheet Share</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
    <div className="navbar-nav">
      <Link className="nav-item nav-link" to="/">Home </Link>
      <Link className="nav-item nav-link" to="/search">Search</Link>
      
      {
          this.props.user == null ? 
          ( <Link className="nav-item nav-link" to="/login">Login</Link>)
          :
          (<Link onClick={()=> this.props.logout()} className="nav-item nav-link" to="/home">Logout</Link>)
      }
     {
         this.props.user != null ? (<Link className="nav-item nav-link" to="/all">Profile</Link>)
         :
         null
     }
      
      {/* <a className="nav-item nav-link" href="#">Pricing</a>
      <a className="nav-item nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a> */}
    </div>
  </div>
</nav>
        );
    }
}

function mapStateToProps(state, ownProps){
    return{
        user: state.user
    }
}

export default connect(mapStateToProps, {getUser, logout})(Header);