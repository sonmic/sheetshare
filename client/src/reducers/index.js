import { combineReducers } from 'redux';
import postsReducer from './postsReducer';
import userReducer from './userReducer';
import loadingReducer from './loadingReducer';
import aPostsReducer from './aPostsReducer'

const rootReducer = combineReducers({
    posts: postsReducer,
    user: userReducer,
    loading: loadingReducer,
    aPosts: aPostsReducer
});

export default rootReducer;