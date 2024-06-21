import { useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

const SearchBar = ({ searchTerm, onSearch }) => {
  const [term, setTerm] = useState(searchTerm);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setTerm(value);
    onSearch(value);
  };

  const containerClass = "w-full max-w-3xl p-4 bg-gray-50 rounded-lg shadow mb-4";
  const inputClass = "w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-gray-900 focus:border-sky-500 focus:ring-sky-500 focus:outline-none";

  return (
    <div className={containerClass}>
      <div className="relative">
        <MagnifyingGlassIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        <input type="text" placeholder="Search by name..." value={term} onChange={handleSearchChange} className={inputClass} />
      </div>
    </div>
  );
};

export default SearchBar;
