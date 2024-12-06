import React from 'react';
import './ViewLinks.css';

const ViewLinks = ({ links, onDelete }) => {
  return (
    <section id="all-links">
      <h2>Saved Links</h2>
      <ul id="saved-links-list">
        {links.length === 0 ? (
          <li>No links available. Please add some links.</li>
        ) : (
          links.map(({ key, url }) => {
            // console.log("From ViewLinks:", key);  // Debug log here
            return (
              <li key={key}>
                <a href={url} target="_blank" rel="noopener noreferrer">{key}</a>
                <button className="delete-btn" onClick={() => onDelete(key)}>Delete</button>
              </li>
            );
          })
        )}
      </ul>
    </section>
  );
};

export default ViewLinks;
