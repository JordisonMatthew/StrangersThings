import React, {useEffect, useState} from 'react';
import { deletePost, getPosts, sendMessage } from './ajaxHelperFuncs';
import {getPostById} from './helperFuncs';

// displays the singular post with a matching id
const SinglePost = ({selectedPost, match, setSelectedPost, posts, headers, history, setPosts}) => {
    const [message, setMessage] = useState('');

    // updates selectedPost whenever posts value changes
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
            {selectedPost.author? // an error will happen if this does not check the value of author
                <h4><b>Seller:</b> {selectedPost.author.username}</h4>
                :
                null
            }
            <h5><b>Location:</b> {selectedPost.location}</h5>

            {selectedPost.isAuthor? // Displays if the author is the signed in user
                <>
                <button
                onClick={async () => {
                    // deletes the post and alerts the user of if it succeeded or not
                    const result = await deletePost(headers, match.params.postId);
                    alert(`Deleted ${result.success? 'successfully' : 'unsuccessfully'}`);

                    // updates posts before sending the user back to the posts page
                    await getPosts(headers).then(result => setPosts(result));
                    history.push('/posts');
                }}>Delete</button>
                <button
                onClick={() => {
                    // takes the user to the edit page
                    history.push(`/posts/${match.params.postId}/edit`)
                }}>Edit</button>
                </>
                : // If is author is false html below displays
                <form
                onSubmit={async (event) => {
                    // submits the users message to the api
                    event.preventDefault();
                    await sendMessage(headers, match.params.postId, message);
                    setMessage('');

                }}>
                    <input
                    type='text'
                    placeholder='message'
                    value={message}
                    onChange={(event) => {
                        // updates the state of message on change
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