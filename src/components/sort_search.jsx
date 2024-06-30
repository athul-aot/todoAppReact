// SearchSort.jsx
import React from 'react';
import searchIcon from "../assets/search.svg";

function SearchSort({ handleSearch, handleSortChange }) {
  return (
    <div className='search-sort'>
      <div className='search'>
        <input
          type="text"
          placeholder='Search Item'
          onChange={(e) => handleSearch(e.target.value)}
        />
        <button><img src={searchIcon} alt="search" /></button>
      </div>
      <div className='sort'>
        <select onChange={(e) => handleSortChange(e.target.value)}>
          <option value="desc">Newest First</option>
          <option value="asc">Oldest First</option>
        </select>
      </div>
    </div>
  );
}

export default SearchSort;
