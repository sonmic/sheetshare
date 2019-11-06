import { GET_POSTS, POSTS_STATUS, GET_APOSTS } from '../actionTypes';
import { auth, database } from '../firebase';

export function allPosts () {

        return dispatch => {

            dispatch({
                type: POSTS_STATUS,
                payload: true
            });

            const allPosts = database.ref('/all/');

            allPosts.on('value', function (childSnapshot){
                //  console.log(childSnapshot.val());
                 dispatch({
                    type: GET_APOSTS,
                    payload: childSnapshot.val()
                });
            
            //once posts received loading to false
            dispatch({
                type:POSTS_STATUS,
                payload:false
            }); 
        }, () => {
                dispatch({
                    type:POSTS_STATUS,
                    payload: -1
                });
          }); 
    }
}

export function getPosts() {
    
    return dispatch => {
        // loading true before posts loaded
        dispatch({
            type:POSTS_STATUS,
            payload:true
        });
        auth.onAuthStateChanged(userId => {
             userId = userId.uid;
            //  console.log(userId);
             const readPosts = database.ref('/posts/' + userId);
             //const allPosts = database.ref('/posts/');
            // allPosts.on('child_added', function (childSnapshot){
             //    console.log(childSnapshot.val());
             //});
             readPosts.on('value', function(childSnapshot) { 
                // console.log(childSnapshot.val());
                dispatch({
                    type: GET_POSTS,
                    payload: childSnapshot.val()
                });
                //once posts received loading to false
                dispatch({
                    type:POSTS_STATUS,
                    payload:false
                });
                // 
            },() => {
                dispatch({
                    type:POSTS_STATUS,
                    payload: -1
                });
            });
        });
    }
}

export function savePosts(post,url) {
    post.link = url;
    const uid = auth.currentUser.uid;
 
    return dispatch => {
        database.ref('/posts/'+ uid).push(post);
        database.ref('/all/').push(post);
    }
}

export function deletePost(id) {
    const uid = auth.currentUser.uid;
    return dispatch => database.ref('/posts/' + uid).child(id).remove();
}

