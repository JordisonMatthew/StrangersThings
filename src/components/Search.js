import React, {useState} from 'react';
import { filterPosts } from './helperFuncs';

// This component adjust the displayed posts to the user 
// based off of what they type into the input box
const Search = ({setFilteredResults, posts}) => {
    const [searchTerm, setSearchTerm] = useState('');
    return (
        <div>
            <input 
            value={searchTerm}
            onChange={(event) => {
                // updates search term and updates the state of filteredResults
                setSearchTerm(event.target.value);
                console.log(filterPosts(posts, event.target.value));
                setFilteredResults(filterPosts(posts, event.target.value));
            }}
            placeholder='Search'></input>
        </div>
    )
}

export default Search;