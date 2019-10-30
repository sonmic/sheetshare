import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import { getUser } from '../actions/userAction';
import { getPosts } from '../actions/postAction';

class LoadingComponent extends Component {
    componentWillMount() {
        const { userLoading, postsLoading } = this.props;
       
        if (userLoading === undefined) {
            this.props.getUser();
        }

        if (postsLoading === undefined) {
            this.props.getPosts();
        }
    }

    componentWillReceiveProps(nextProps) {
        //wait for user authentication and try to load notes
        if (nextProps.postsLoading === -1 && nextProps.user !== null) {
            this.props.getPosts();
        }
    }

    render() {
        //this code
        const { userLoading, postsLoading, children } = this.props;
        if ((!userLoading && !postsLoading) || this.props.user === null) {
            return <div>{children}</div>
        } else {
            return (
                <div>
                    <h4>Loading...</h4>
                </div>
            );
        }

    }
}

function mapStateToProps(state) {
    return {
        user: state.user,
        userLoading: state.loading.user,
        postsLoading: state.loading.getPosts
    }
}

export default withRouter(connect(mapStateToProps, { getUser, getPosts })(LoadingComponent));
