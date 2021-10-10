import React, {useEffect, useState} from "react";
import { getUser } from "./ajaxHelperFuncs";
import {getPostById} from './helperFuncs';

// Displays the users relevant information and messages
const Profile = ({headers, setSelectedPost, history, posts, username}) => {
    const [userPosts, setUserPosts] = useState([]);
    const [messages, setMessages] = useState([]);

    // updates userPosts and messages whenever the value of username changes
    useEffect( async () => {
        const result = await getUser(headers);
        console.log('user Posts in profile:', result);
        if (result.success) {
            setUserPosts(result.data.posts);
            setMessages(result.data.messages);
        }
    }, [username])
    return (
        <>
        <h1>Messages To Me:</h1> {/*displays any messages sent to the user and a button to go to post*/}
        {
            messages.map((message, idx) => {
                return (
                    username !== message.fromUser.username?
                    <div key={idx}>
                        <h3><b>From: </b>{message.fromUser.username}</h3>
                        <p>{message.content}</p>
                        <button
                            onClick={() => {
    
                                setSelectedPost(getPostById(message.post._id, posts));
                                history.push('/posts/' + message.post._id);
                            }}>View Post</button> 
                    </div>
                    :
                    null
                )
            })
        }
        <h1>Messages From Me:</h1> {/*displays messages sent by the user and a button to go to the post */}
        {
            messages.map((message, idx) => {
                return (
                <div key={idx}>
                    <h3>(Sent By Me)</h3>
                    <p>{message.content}</p>
                    <button
                        onClick={() => {

                            setSelectedPost(getPostById(message.post._id, posts));
                            history.push('/posts/' + message.post._id);
                        }}>Message Again</button> 
                </div>
                )
            })
        }
        {//displays the users posts that are still active
            userPosts.map((userPost, idx) => {
                return (userPost.active?
                    <div key={idx}>
                        <h2>{userPost.title}</h2>
                            <p>{userPost.description}</p>
                            <h5><b>Price:</b> {userPost.price}</h5>
                            <h5><b>Location:</b> {userPost.location}</h5>
                            <button
                                onClick={() => {

                                setSelectedPost(getPostById(userPost._id, posts));
                                history.push('/posts/' + userPost._id);
                        }}>view</button> 
                    </div>
                    :
                    null
                )
            })
        }
        </>
    )
}

export default Profile;