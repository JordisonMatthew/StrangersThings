/* This page has all the api helper functions used
* throughout the StrangerThings app
*/
const COHORT = '2107-CSU-RM-WEB-PT';
const API = `https://strangers-things.herokuapp.com/api/${COHORT}`;

export async function registerUser(username, password, confirmPassword) {
    
    if (confirmPassword !== password) {
        alert('password must match confirm password');
        return;
    }

    fetch(`${API}/users/register`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            user: {
            username: username,
            password: password
            }
        })
        }).then(response => response.json())
        .then(result => {
            console.log(result);
            return result;
        })
        .catch(console.error);
        
}

export async function loginUser(username, password, setToken)  {
    try {
        const response = await fetch(`${API}/users/login`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user: {
                username: username,
                password: password
                }
            })
            })

        const result = await response.json();
        console.log(result);
        setToken(result.data.token);
        console.log(username, password);

        localStorage.setItem("token", result.data.token);
    } catch(err) {
        console.error(err);
    }

}

export async function getPosts() {
    try {
        const response = await fetch(`${API}/posts`)   
        const result = await response.json();
        return result.data.posts;
    } catch (err) {
        console.error(err);
    }

}