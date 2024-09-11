"use client";
import { useState } from 'react';

const SearchBar = ({ onSearch }: { onSearch: (query: string) => void }) => {
  const [query, setQuery] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSearch(query); // Call the function passed as prop with the search query
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Search for a recipe..."
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchBar;
