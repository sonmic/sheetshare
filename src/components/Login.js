import React, { Component } from 'react';
import { connect } from 'react-redux';
import { googleLogin } from '../actions/userAction';


class Login extends Component {
    render(){
        return(
            <div className="container-fluid">
                <div className="row text-center">
                    <div className="col-sm-12 jumbotron" style={{marginTop : '--20px'}}>
                        <h5>Login with your favorite Social Network</h5>
                    </div>
                    {/* <div className="col-sm-6">
                        <button className="btn btn-danger btn-lg">Login With Google</button>
                    </div> */}
                    <br />
                    <div onClick={this.props.googleLogin}className="col-sm-12">
                        <button className="btn btn-info btn-lg">Login With Google</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(null, {googleLogin})(Login);