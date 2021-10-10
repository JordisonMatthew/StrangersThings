import React, {useState, useEffect} from 'react';

import { makePost, getPosts, editPost } from './ajaxHelperFuncs';

const MakePost = ({headers, history, setPosts, selectedPost, match}) => {
    const [title, setTitle] = useState(selectedPost? selectedPost.title : '');
    const [description, setDescription] = useState(selectedPost? selectedPost.description : '');
    const [price, setPrice] = useState(selectedPost? selectedPost.price : '');
    const [location, setLocation] = useState(selectedPost? selectedPost.location : '');
    const [willDeliver, setWillDeliver] = useState(selectedPost? selectedPost.willDeliver : false);

    // This useEffect just updates the page when headers is updated
    useEffect(() => {

    }, [headers])
    return (
        <>
            <h1>{!selectedPost? 'add a new post' : 'edit a post'}</h1>
            <form
            onSubmit={async (event) => {
                event.preventDefault();

                if (selectedPost) {
                    const result = await editPost(headers, match.params.postId, title, description, location, willDeliver, price);

                    alert(`Edited ${result.success? 'successfully' : 'unsuccessfully'}`);

                    await getPosts(headers).then(result => setPosts(result));

                    history.push('/posts/postId');
                    return
                }


                if (!localStorage.getItem('token')) {
                    alert('Please sign in or sign up before creating a post');
                    return;
                }
                if (!title || !description || !price) {
                    alert('Missing required information')
                }
                else {
                    const result = await makePost(headers, title, description, location, willDeliver, price);
                    alert(`Posted ${result.success? 'successfully' : 'unsuccessfully'}`);

                    await getPosts(headers).then(result => setPosts(result));

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