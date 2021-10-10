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
        if (result.error !== null) {
            alert('incorrect username or password');
            return;
        }
        setToken(result.data.token);

        localStorage.setItem("token", result.data.token);

        return result.error;
    } catch(err) {
        console.error(err);
    }

}

export async function getPosts(headers) {
    try {
        const response = await fetch(`${API}/posts`, {
            headers
        })   
        const result = await response.json();
        console.log('posts', result.data.posts);
        return result.data.posts;
    } catch (err) {
        console.error(err);
    }

}

export async function getUser(headers) {
    try {
        const response = await fetch(`${API}/users/me`,{
            headers
        })
        const result = await response.json();
        console.log('user posts:',result);
        return result;
    } catch(err) {
        console.error(err);
    }
}

export async function makePost(headers, title, description, location, willDeliver, price) {
    let post = {};
    if (location) {
        post = {
            title: title,
            description: description,
            price: price,
            location: location,
            willDeliver: willDeliver}
    }
    else {
        post = {
            title: title,
            description: description,
            price: price,
            willDeliver: willDeliver}
        }
    try {
        const response = await fetch(`${API}/posts`, {
            method: "POST",
            headers,
            body: JSON.stringify({
                post
            })
        })
        const result = await response.json();
        console.log(result);
        return result;
    } catch(err) {
        console.error(err);
    }
}

export async function deletePost(headers, postId) {
    try {
        const response = await fetch(`${API}/posts/${postId}`, {
            method: "DELETE",
            headers
        })

        const result = await response.json();

        console.log(result);
        return result;
    } catch(err) {
        console.error(err);
    }
}

export async function editPost(headers, postId, title, description, location, willDeliver, price) {
    const post = {
        title: title,
        description: description,
        price: price,
        location: location,
        willDeliver: willDeliver
    }

    try {
        const response = await fetch(`${API}/posts/${postId}`, {
            method: "PATCH",
            headers,
            body: JSON.stringify({
                post
            })
        })

        const result = await response.json();
        console.log(result);
        return result;
    } catch(err) {
        console.error(err);
    }

}


export async function sendMessage(headers, postId, message) {
    try {
        const response = await fetch(`${API}/posts/${postId}/messages`, {
            method: "POST",
            headers,
            body: JSON.stringify({
                message: {
                  content: message
                }
              })
            })
        const result = await response.json();
        console.log(result);
        return result;
    } catch(err) {
        console.error(err);
    }
}