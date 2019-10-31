import { combineReducers } from 'redux';
import postsReducer from './postsReducer';
import userReducer from './userReducer';
import loadingReducer from './loadingReducer';

const rootReducer = combineReducers({
    posts: postsReducer,
    user: userReducer,
    loading: loadingReducer
});

export default rootReducer;