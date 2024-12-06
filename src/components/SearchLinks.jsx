import React, { useState } from 'react';
import './SearchLinks.css';
import { toast } from 'react-toastify'; // Importing react-toastify for the success message

const SearchLinks = ({ links }) => {
  const [query, setQuery] = useState('');
  const [copiedKeys, setCopiedKeys] = useState({}); // Track copied state for each key

  // Filter links based on query (case insensitive search on 'key')
  const filteredLinks = links.filter(({ key }) =>
    key.toLowerCase().includes(query.toLowerCase())
  );

//   console.log("Search Query:", query); // Debug: Show the search query
//   console.log("Filtered Links:", filteredLinks); // Debug: Show the filtered links

  // Handle copy action
  const handleCopy = (key, url) => {
    navigator.clipboard.writeText(url); // Copy URL to clipboard
    setCopiedKeys(prevState => ({ ...prevState, [key]: true })); // Mark as copied for the specific key

    toast.success(`Link for ${key} copied successfully!`, { // Show success toast
      position: toast.POSITION.TOP_RIGHT
    });

    // Reset the copied state after 2 seconds
    setTimeout(() => {
      setCopiedKeys(prevState => ({ ...prevState, [key]: false }));
    }, 2000);
  };

  return (
    <div id="search-box">
      <h2>Search Links</h2>
      <input
        type="text"
        id="search-field"
        placeholder="Search by key..."
        value={query}
        onChange={(e) => setQuery(e.target.value)} // Update query state on input change
      />
      {query && (
        <ul id="links-list">
          {filteredLinks.length === 0 ? (
            <li>No matching links found.</li>
          ) : (
            filteredLinks.map(({ key, url }) => (
              <li key={key}>
                <span>{key}</span>
                <button
                  className="copybtn"
                  onClick={() => handleCopy(key, url)} // Copy the URL and show toast
                >
                  {copiedKeys[key] ? 'Copied' : 'Copy'} {/* Change button text based on copied state */}
                </button>
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
};

export default SearchLinks;
