import React, {useState, useEffect} from 'react';

import { makePost } from './ajaxHelperFuncs';

const MakePost = ({headers, history}) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [location, setLocation] = useState('');
    const [willDeliver, setWillDeliver] = useState(false);

    // This useEffect just updates the page when headers is updated
    useEffect(() => {

    }, [headers])
    return (
        <>
            <h1>Add a New Post</h1>
            <form
            onSubmit={async (event) => {
                event.preventDefault();
                if (!localStorage.getItem('token')) {
                    alert('Please sign in or sign up before creating a post');
                    return;
                }
                if (!title || !description || !price) {
                    alert('Missing required information')
                }
                else {
                    await makePost(headers, title, description, location, willDeliver, price);

                    history.push('/posts');
                }
            }}>
                <input
                type='text'
                placeholder='Title*'
                value={title}
                onChange={(event) => {
                    setTitle(event.target.value);
                }}
                ></input>
                <input
                type='text'
                placeholder='Description*'
                value={description}
                onChange={(event) => {
                    setDescription(event.target.value);
                }}
                ></input>
                <input
                type='text'
                placeholder='Price*'
                value={price}
                onChange={(event) => {
                    setPrice(event.target.value);
                }}
                ></input>
                <input
                type='text'
                placeholder='Location'
                value={location}
                onChange={(event) => {
                    setLocation(event.target.value);
                }}
                ></input>
                <input
                name='willDeliver'
                id='willDeliver'
                type='checkbox'
                value={willDeliver}
                onClick={(event) => {
                    setWillDeliver(event.target.checked);
                }}
                ></input>
                <label htmlFor='willDeliver'></label>
                <button
                type='submit'>Submit</button>
            </form>
        </>
    )
}

export default MakePost;