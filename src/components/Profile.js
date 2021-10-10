import React, {useEffect, useState} from "react";
import { getUser } from "./ajaxHelperFuncs";
import { makeHeaders } from "./helperFuncs";
const Profile = ({headers}) => {
    const [posts, setPosts] = useState([]);
    const [messages, setMessages] = useState([]);

    useEffect( async () => {
        const result = await getUser(headers);
        console.log('user Posts in profile:', result);
        if (!result.error) {
            setPosts(result.data.posts);
            setMessages(result.data.messages);
        }
    }, [headers])
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