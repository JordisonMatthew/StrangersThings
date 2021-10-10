import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import { getPostById } from './helperFuncs';

const Posts = ({loggedIn, history, posts, setSelectedPost}) => {
    
    return (
        <div>
            <div>
                <Link to='/posts/add'>(ADD POST)</Link>
            </div>
            {
                posts.map((post, idx) => {
                    return (
                        <div className="postcard" key={idx}>
                            <h2>{post.title}</h2>
                            <p>{post.description}</p>
                            <h5><b>Price:</b> {post.price}</h5>
                            <h4><b>Seller:</b> {post.author.username}</h4>
                            <h5><b>Location:</b> {post.location}</h5>
                            {loggedIn?
                                <>
                                {post.isAuthor?
                                    <button
                                    onClick={() => {

                                        setSelectedPost(getPostById(post._id, posts));
                                        history.push('/posts/' + post._id);
                                    }}>View</button> 
                                    :
                                    <button 
                                    onClick={() => {

                                        setSelectedPost(getPostById(post._id, posts));
                                        history.push('/posts/' + post._id);
                                    }}>Send Message</button>
                                }
                                </>
                                :
                                null
                            }
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Posts;