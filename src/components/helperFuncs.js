export function logIn(token, setToken) { //needs some finishing up
    localStorage.setItem('token', token)
}

export function logOut(setToken) {

}

export function isLoggedIn(token) { // should be complete
    if (token) return true
    else return false
}

export function makeHeaders(token) {
    const header = {
        'Content-Type': 'application/json',
        'Authorization': token
      }
    return header;
}