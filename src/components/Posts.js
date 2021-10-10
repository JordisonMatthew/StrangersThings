import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import { getPostById } from './helperFuncs';
import Search from './Search';

// Displays all the posts made on the cohort-name of the api
const Posts = ({loggedIn, history, posts, setSelectedPost}) => {

    const [filteredResults, setFilteredResults] = useState([]);

    // updates the filtered results when posts is updated to insure accuracy
    useEffect(() => {
        setFilteredResults(posts);
    }, [posts]);
    
    return (
        <div>
            <div> {/*a Search bar and a link to add a new post */}
                <Search posts={posts} setFilteredResults={setFilteredResults}/>
                <Link to='/posts/add'>(ADD POST)</Link>
            </div>
            {// Displays all the posts based off of the filterResults array
            // This array is adjusted everytime the user enters something into the Search
            // Component search bar
                filteredResults.map((post, idx) => {
                    return (
                        <div className="postcard" key={idx}>
                            <h2>{post.title}</h2>
                            <p>{post.description}</p>
                            <h5><b>Price:</b> {post.price}</h5>
                            <h4><b>Seller:</b> {post.author.username}</h4>
                            <h5><b>Location:</b> {post.location}</h5>
                            {loggedIn?
                                <>
                                {post.isAuthor? // Only displays if the user is the author of the post
                                    <button
                                    onClick={() => {
                                        // updates the selected post and brings the user to that posts url
                                        setSelectedPost(getPostById(post._id, posts));
                                        history.push('/posts/' + post._id);
                                    }}>View</button> 
                                    :
                                    <button 
                                    onClick={() => {
                                        // updates the selected post and brings the user to that posts url
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