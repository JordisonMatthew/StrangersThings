import React, {useState, useEffect} from "react";
import { getUser} from "./ajaxHelperFuncs";

const Home = ({headers, history}) => {
    const [username, setUsername] = useState('');

    useEffect( async () => {
        console.log(username);

        const result = await getUser(headers);
        if (!result.error) {
            setUsername(result.data.username);
        }
    }, [headers])
    return (
        <>
    <h1>Welcome to Stranger's Things!</h1>
    {username?
        <>
        <h3>Logged in as {username}</h3>
        <button
        onClick={() => {
            history.push('/profile');
        }}>Profile</button>
        </>
        :
        null
    }
    </>
    )
}

export default Home;