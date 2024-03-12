import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
function SearchBar({ onSearch }) {
  const [search, setSearch] = useState('');

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
    onSearch(event.target.value);
  };

  

  return (
    <div className="search-container">
      <FaSearch className="search-icon" />
      <input
        type="text"
        placeholder="SEARCH A CHARACTER..."
        className="search-input"
        value={search}
        onChange={handleSearchChange}
      />
      
    </div>
  );
}

export default SearchBar;