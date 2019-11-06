import { GET_APOSTS } from '../actionTypes';

export default function (state={}, action){
    switch (action.type) {
        case GET_APOSTS:
            return action.payload;
            default:
                return state;
    }
}