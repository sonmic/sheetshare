import { POSTS_STATUS, USER_STATUS } from '../actionTypes';

export default function (state={}, action) {
    switch(action.type){
        case POSTS_STATUS:
            return {...state, posts: action.payload}
            case USER_STATUS:
            return {...state, user: action.payload}
            default:
                return state;
    };
};