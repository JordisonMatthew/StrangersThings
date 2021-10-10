import React, {useEffect} from 'react';
import {getPostById} from './helperFuncs';

const SinglePost = ({selectedPost, match, setSelectedPost, posts}) => {
    useEffect(() => {
        const postId = match.params.postId;
        
        const foundPost = getPostById(postId, posts);
        setSelectedPost(foundPost);
    }, [posts])
    return (posts.length &&
        <div className="postcard">
            <h2>{selectedPost.title}</h2>
            <p>{selectedPost.description}</p>
            <h5><b>Price:</b> {selectedPost.price}</h5>
            {selectedPost.author?
                <h4><b>Seller:</b> {selectedPost.author.username}</h4>
                :
                null
            }
            <h5><b>Location:</b> {selectedPost.location}</h5>

            {selectedPost.isAuthor?
                <>
                <button>Delete</button>
                <button>Edit</button>
                </>
                :
                <button>Message</button>
            }
        </div>
    )
}

export default SinglePost;