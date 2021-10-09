import React, {useState, useEffect} from "react";
import { getUsername } from "./ajaxHelperFuncs";
import { makeHeaders } from "./helperFuncs";
const Home = ({headers}) => {
    const [username, setUsername] = useState('');

    useEffect( async () => {
        console.log(username);

        const result = await getUsername();
        setUsername(result);
    }, [])
    return (
        <>
    <h1>Welcome to Stranger's Things!</h1>
    {username?
        <h3>Logged in as {username}</h3>
        :
        null
    }
    </>
    )
}

export default Home;