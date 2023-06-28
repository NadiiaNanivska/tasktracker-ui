import React, { useState } from 'react';
import '../styles/Search.css';

function Search() {
    return (
        <div className="search">
            <input placeholder="Search" className="search-input" type="search"/>
        </div>
    );
}

export default Search;