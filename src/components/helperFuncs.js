
export function logOut(setToken) {
    setToken(null);
    localStorage.removeItem('token');
}

export function isLoggedIn(token) { // should be complete
    if (token) return true
    else return false
}

export function makeHeaders(token) {
    let headers = {};
    if (token) {
            headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    }
    else {
        headers = {
            'Content-Type': 'application/json'
        }
    }

    return headers;
}

export function getPostById(postId, posts) {
    const myPost = posts.find((post) => {
        return postId === post._id;
    })
    return myPost || {};
}