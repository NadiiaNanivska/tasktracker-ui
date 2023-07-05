import React, { createContext, useState } from 'react';

export const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
    const [searchText, setSearchText] = useState('');

    const handleSearch = (text) => {
        setSearchText(text);
    };

    return (
        <SearchContext.Provider value={{ searchText, handleSearch }}>
            {children}
        </SearchContext.Provider>
    );
};
