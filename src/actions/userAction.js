import { auth , googleProvider } from '../firebase';
import { GET_USER } from '../actionTypes';
import { withRouter } from 'react-router-dom';

export function googleLogin(){
    return dispatch => {
        auth.signInWithPopup(googleProvider).then(function(result){
            console.log(result.user);
            
        }).catch(function(error){
            console.log(error);
        });
        
    }
}

export function getUser() {
    return dispatch => {
        auth.onAuthStateChanged(user => {
            // console.log(user.uid);
            dispatch({
                type: GET_USER,
                payload: user
            })
        })
    }
}

export function logout(){
    return dispatch => auth.signOut();
}


