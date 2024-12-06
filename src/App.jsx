import React, { useState, useEffect } from 'react';
import { openDB } from 'idb';
import Header from './components/Header.jsx';
import AddLink from './components/AddLinks.jsx';
import ViewLinks from './components/ViewLinks.jsx';
import SearchLinks from './components/SearchLinks.jsx';
import './App.css';

import { ToastContainer, toast } from 'react-toastify'; // Import Toastify
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify styles

const openDatabase = async () => {
  try {
    const db = await openDB('UserLinksDB', 1, {
      upgrade(db) {
        if (!db.objectStoreNames.contains('links')) {
          const objectStore = db.createObjectStore('links', { keyPath: 'key' });
        }
      },
    });
    return db;
  } catch (error) {
    throw error;
  }
};

const App = () => {
  const [links, setLinks] = useState([]);
  const [activeSection, setActiveSection] = useState(null); // Track the active section
  const [searchQuery, setSearchQuery] = useState(""); // Track search query

  // Notify success
  const notifySuccess = (message) => {
    toast.success(message);
  };

  // Notify error
  const notifyError = (message) => {
    toast.error(message);
  };

  const loadLinks = async () => {
    try {
      const db = await openDatabase();
      const allLinks = await db.getAll('links');  
      setLinks(allLinks);
    } catch (error) {
      notifyError("Error loading links from the database.");
    }
  };

  const saveLink = async (key, url) => {
    try {
      const db = await openDatabase();
      const newLink = { key, url };  
      await db.put('links', newLink);  
      loadLinks();  
      notifySuccess("Link saved successfully!");
    } catch (error) {
      notifyError("Error saving the link.");
    }
  };

  const deleteLink = async (key) => {
    try {
      const db = await openDatabase();
      await db.delete('links', key);  
      loadLinks();  
      notifySuccess("Link deleted successfully!");
    } catch (error) {
      notifyError("Error deleting the link.");
    }
  };

  const handleSectionToggle = (section) => {
    if (activeSection === section) {
      setActiveSection(null);
    } else {
      setActiveSection(section);
    }
  };

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeydown = (event) => {
      if (event.ctrlKey && event.key === 'm') {
        event.preventDefault();
        handleSectionToggle('addLink'); // Open AddLink on Ctrl+M
      } else if (event.ctrlKey && event.key === 'v') {
        event.preventDefault();
        handleSectionToggle('viewLinks'); // Open ViewLinks on Ctrl+V
      } else if (event.ctrlKey && event.key === 's') {
        event.preventDefault();
        handleSectionToggle('searchLinks'); // Open SearchLinks on Ctrl+S
      }
    };

    window.addEventListener('keydown', handleKeydown);
    return () => {
      window.removeEventListener('keydown', handleKeydown);
    };
  }, [activeSection]);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredLinks = links.filter((link) =>
    link.key.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    loadLinks();
  }, []);

  return (
    <div className="container">
      <Header />
      <div className="actions">
        <button onClick={() => handleSectionToggle('addLink')}>➕ Add Link</button>
        <button onClick={() => handleSectionToggle('viewLinks')}>📂 View All Links</button>
        <button onClick={() => handleSectionToggle('searchLinks')}>🔍 Search</button>
      </div>

      {/* Conditionally render the sections based on activeSection */}
      {activeSection === 'addLink' && <AddLink onSave={saveLink} />}
      {activeSection === 'viewLinks' && (
        <ViewLinks links={filteredLinks} onDelete={deleteLink} />
      )}
      {activeSection === 'searchLinks' && (
        <SearchLinks
          links={filteredLinks}
          searchQuery={searchQuery}
          onSearch={handleSearch}
        />
      )}

      {/* Toastify container to show the notifications */}
      <ToastContainer />
    </div>
  );
};

export default App;
