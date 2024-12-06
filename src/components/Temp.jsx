import { useState, useEffect } from "react";
import { openDB } from "idb"; // Importing the idb library

// Open IndexedDB database
const dbPromise = openDB('userDataDB', 1, {
  upgrade(db) {
    if (!db.objectStoreNames.contains('userData')) {
      const store = db.createObjectStore('userData', {
        autoIncrement: true // Automatically assign a unique ID
      });
      store.createIndex('nameIndex', 'name'); // Optional: create an index on name for querying
    }
  }
});

function Temp() {
  const [userData, setUserData] = useState([]);
  const [inputName, setInputName] = useState("");
  const [inputAge, setInputAge] = useState("");

  const channel = new BroadcastChannel("my_channel");

  // Set up the message listener to get data across tabs
  useEffect(() => {
    // Read all data from IndexedDB on load
    dbPromise.then(db => {
      db.getAll('userData').then(data => {
        if (data) {
          setUserData(data);
        }
      });
    });

    // Listen to BroadcastChannel for updates
    channel.onmessage = (event) => {
      const { name, age } = event.data;
      const newData = { name, age };
      setUserData(prevData => [...prevData, newData]); // Add new data to the list
      saveDataToIndexedDB(newData); // Save the received data to IndexedDB
    };

    // Cleanup listener on component unmount
    return () => {
      channel.close();
    };
  }, []);

  // Save data to IndexedDB
  const saveDataToIndexedDB = (data) => {
    dbPromise.then(db => {
      db.add('userData', data); // Use `add` to insert new records with auto-incremented IDs
    });
  };

  // Function to handle saving data and broadcasting it
  const handleSaveData = () => {
    const data = { name: inputName, age: inputAge };
    setUserData(prevData => [...prevData, data]);  // Update local state
    channel.postMessage(data);  // Broadcast to other tabs
    saveDataToIndexedDB(data);  // Save to IndexedDB
    setInputName("");  // Clear input fields
    setInputAge("");
  };

  return (
    <div className="App">
      <h1>Shared User Data Across Tabs with Permanent Storage</h1>

      <div>
        <h2>Current Data:</h2>
        {userData.length > 0 ? (
          <ul>
            {userData.map((data, index) => (
              <li key={index}>
                <strong>Name:</strong> {data.name}, <strong>Age:</strong> {data.age}
              </li>
            ))}
          </ul>
        ) : (
          <p>No data available.</p>
        )}
      </div>

      <div>
        <h2>Enter New Data:</h2>
        <input
          type="text"
          placeholder="Enter name"
          value={inputName}
          onChange={(e) => setInputName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Enter age"
          value={inputAge}
          onChange={(e) => setInputAge(e.target.value)}
        />
        <button onClick={handleSaveData}>Save & Broadcast Data</button>
      </div>
    </div>
  );
}

export default Temp;
