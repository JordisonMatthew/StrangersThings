export function logIn(token, setToken) { //needs some finishing up
    localStorage.setItem('token', token)
}

export function logOut(setToken) {
    setToken(null);
    localStorage.removeItem('token');
}

export function isLoggedIn(token) { // should be complete
    if (token) return true
    else return false
}

export function makeHeaders() {
    const token = localStorage.getItem('token')
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