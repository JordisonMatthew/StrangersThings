// Logs the user out in state and the browser
export function logOut(setToken) {
    setToken(null);
    localStorage.removeItem('token');
}

// returns true if the user has a token currently
export function isLoggedIn(token) { // should be complete
    if (token) return true
    else return false
}

// makes headers based off of if their is a value in token
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

// gets the post with the match id or if their isn't one returns a blank object
export function getPostById(postId, posts) {
    const myPost = posts.find((post) => {
        return postId === post._id;
    })
    return myPost || {};
}

// filters the posts based off of:
// title, description, username, location, and price
export function filterPosts(posts, searchTerm) {
    searchTerm = searchTerm.toLowerCase();

    return posts.filter((post) => {
        const postTitle = post.title.toLowerCase();
        const postDescription = post.description.toLowerCase();
        const postUsername = post.author.username.toLowerCase();
        const postLocation = post.location.toLowerCase();
        const postPrice = post.price.toLowerCase();

        return postTitle.includes(searchTerm) || postDescription.includes(searchTerm) || postUsername.includes(searchTerm) || postLocation.includes(searchTerm) || postPrice.includes(searchTerm);
    })
}