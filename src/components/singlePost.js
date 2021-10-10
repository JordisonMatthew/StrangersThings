import React, {useEffect, useState} from 'react';
import { deletePost, getPosts, sendMessage } from './ajaxHelperFuncs';
import {getPostById} from './helperFuncs';

const SinglePost = ({selectedPost, match, setSelectedPost, posts, headers, history, setPosts}) => {
    const [message, setMessage] = useState('');

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
                <button
                onClick={async () => {
                    const result = await deletePost(headers, match.params.postId);
                    alert(`Deleted ${result.success? 'successfully' : 'unsuccessfully'}`);

                    await getPosts(headers).then(result => setPosts(result));
                    history.push('/posts');
                }}>Delete</button>
                <button
                onClick={() => {
                    
                    history.push(`/posts/${match.params.postId}/edit`)
                }}>Edit</button>
                </>
                :
                <form
                onSubmit={async (event) => {
                    event.preventDefault();
                    await sendMessage(headers, match.params.postId, message);
                    setMessage('');

                }}>
                    <input
                    type='text'
                    placeholder='message'
                    value={message}
                    onChange={(event) => {
                        setMessage(event.target.value);
                    }}
                    ></input>
                    <button type='submit'>Send Message</button>
                </form>
            }
        </div>
    )
}

export default SinglePost;