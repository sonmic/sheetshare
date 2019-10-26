import React from 'react';


const PostCard = ({ title, blurb, onClick, genre, instrument }) => {
  return (

    <div className="media" >
      <a href="https://firebasestorage.googleapis.com/v0/b/sheet-share-41538.appspot.com/o/Bohemian_Rhapsody.png?alt=media&token=d6817355-f4ee-489b-8a16-e3f86d97c75d"
      target="blank">
      <img src="https://firebasestorage.googleapis.com/v0/b/sheet-share-41538.appspot.com/o/Bohemian_Rhapsody.png?alt=media&token=d6817355-f4ee-489b-8a16-e3f86d97c75d"
        className="mr-3"
        alt="..."
        style={{ width: '100px', height: '100px' }} />
        </a>
        
      <div className="media-body">
        <h3 className="mt-0">{title}</h3>
        <h6 className="card-title">{genre}</h6>
        <h6 className="card-title">{instrument}</h6>
        {blurb}
        <hr />
        {(onClick == null)? null : <button
          name="delete"
          onClick={onClick}
          className="btn btn-danger">Delete</button>
        }
      </div>
    </div>






  );
}

export default PostCard;