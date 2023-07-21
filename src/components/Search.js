import React, {useContext} from 'react';
import '../styles/Search.css';
import {SearchContext} from "../contexts/SearchContext";

function Search({isDarkMode}) {
    const { searchText, handleSearch } = useContext(SearchContext);

    const handleChange = (event) => {
        console.log(event.target.value)
        handleSearch(event.target.value);
    };

    return (
        <div className="search">
            <input value={searchText} onChange={handleChange} placeholder="Search" className={`search-input ${isDarkMode ? 'dark' : ''}`}
                   type="search"/>
        </div>
    );
}

export default Search;