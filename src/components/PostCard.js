import React from 'react';

const PostCard = ({ title, blurb, onClick }) => {
    return(
        
        <div className="card" style={{width: '18rem'}}>
            <div className="card-body">
              <h5 className="card-title">{title}</h5>
                <p className="card-text">{blurb}</p>
                <button 
                name="delete" 
                onClick={onClick} 
                className="btn btn-danger">Delete</button>
            </div>
          </div>
    
    );
}

export default PostCard;