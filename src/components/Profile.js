import React, {useEffect, useState} from "react";
import { getUserPosts } from "./ajaxHelperFuncs";
import { makeHeaders } from "./helperFuncs";
const Profile = ({token}) => {
    const [posts, setPosts] = useState([]);
    const [messages, setMessages] = useState([]);

    useEffect( async () => {
        const headers = makeHeaders();
        const result = await getUserPosts(headers);
        console.log('user Posts in profile:', result);
        if (!result.error) {
            setPosts(result.data.posts);
            setMessages(result.data.messages);
        }
    }, [])
    return (
        <>
        {posts?
            posts.map((post) => {
                <h1>{post.title}</h1>
            })
            :
            null
        }
        </>
    )
}

export default Profile;