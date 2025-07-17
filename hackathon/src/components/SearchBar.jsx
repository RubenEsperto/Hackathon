import React, { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import '../styles/SearchBar.css'; 

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (query.trim()) {
      onSearch(query); // Ready to hit your backend here
    }
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search..."
        className="input-search"
        name="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button type="submit">
        <SearchIcon/>
      </button>
    </form>
  );
};

export default SearchBar;