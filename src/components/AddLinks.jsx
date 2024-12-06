// src/components/AddLink.jsx
import React, { useState } from 'react';
import './AddLinks.css'

const AddLink = ({ onSave }) => {
  const [key, setKey] = useState('');
  const [url, setUrl] = useState('');

  const handleSaveLink = () => {
    if (!key || !url) {
      alert("Please enter both a key and a URL.");
      return;
    }
    onSave(key, url); // Call the parent function to save the link
    setKey('');
    setUrl('');
  };

  return (
    <section id="add-link-section">
      <h2>Add a New Link</h2>
      <div className="form-group">
        <label htmlFor="link-key">Key:</label>
        <input
          type="text"
          id="link-key"
          value={key}
          onChange={(e) => setKey(e.target.value)}
          placeholder="e.g., GitHub"
        />
      </div>
      <div className="form-group">
        <label htmlFor="link-url">URL:</label>
        <input
          type="text"
          id="link-url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="e.g., https://github.com/"
        />
      </div>
      <button id="save-link" className="save-btn" onClick={handleSaveLink}>
        Save Link
      </button>
    </section>
  );
};

export default AddLink;
