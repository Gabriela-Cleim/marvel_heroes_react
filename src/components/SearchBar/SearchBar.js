import React, { useState } from 'react';
import './SearchBar.css';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (searchTerm.trim()) {
        onSearch(searchTerm);
      }
    }
  };

  return (
    <form className="search-bar">
      <div className="search-input-container">
        <span className="search-icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="rgba(244, 55, 53, 1)"
            viewBox="0 0 24 24"
          >
            <path d="M21.71 20.29l-5.42-5.42A8.94 8.94 0 0019 11a9 9 0 10-9 9c1.87 0 3.57-.58 5-1.55l5.42 5.42a1 1 0 001.42-1.42zM10 18a8 8 0 118-8 8 8 0 01-8 8z" />
          </svg>
        </span>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Procure por heróis"
          className="search-input"
          onKeyDown={handleSearch}
        />
      </div>
    </form>
  );
};

export default SearchBar;
