import React, {  Component } from 'react';
import { connect } from 'react-redux';

import { withRouter } from 'react-router-dom';

class AuthenticatedComponent extends Component {
    componentDidUpdate(){
        // make sure loading done/ if no user then push to login
        const {userLoading, user} = this.props;
        if (userLoading === false && !user){
            this.props.history.push('/login');
        }
    }
    render(){
        const { user, userLoading, children } = this.props;
        return (userLoading === false && user) ? this.props.history.push('/home') : children;    
    }
}


function mapStateToProps(state) {
    return{
        userLoading: state.loading.user,
        user: state.user    
    };
};

export default withRouter(connect(mapStateToProps)(AuthenticatedComponent));