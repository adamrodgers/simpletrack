import { useState } from "react";

const SearchBar = ({ searchTerm, onSearch }) => {
  return (
    <div className="w-full max-w-3xl p-4 bg-gray-50 rounded shadow mb-4">
      <input
        type="text"
        placeholder="Search by name..."
        value={searchTerm}
        onChange={(e) => onSearch(e.target.value)}
        className="w-full px-4 py-2 border border-sky-900 rounded text-gray-900 focus:border-sky-900"
      />
    </div>
  );
};

export default SearchBar;
