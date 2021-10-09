import React, {useEffect, useState} from 'react';

import {getPosts} from './ajaxHelperFuncs';

const Posts = () => {
    const [posts, setPosts] = useState([]);

    useEffect( async () => {
        const result = await getPosts();
        setPosts(result);
    }, [])
    return (
        <div>
            {
                posts.map((post, idx) => {
                    return (
                        <div className="postcard" key={idx}>
                            <h2>{post.title}</h2>
                            <p>{post.description}</p>
                            <h5><b>Price:</b> {post.price}</h5>
                            <h4><b>Seller:</b> {post.author.username}</h4>
                            <h5><b>Location:</b> {post.location}</h5>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Posts;