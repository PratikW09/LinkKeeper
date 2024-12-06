
# LinkKeeper - Your Personal Bookmark Solution 📑🔗  

## Problem Statement  
In today's fast-paced digital world, we frequently need quick access to important links like GitHub profiles, LinkedIn profiles, or other resources. Manually navigating to these profiles and copying their links wastes valuable time. LinkKeeper solves this problem by letting you store and retrieve your most-used links effortlessly.  

With this browser extension, you can save links with meaningful names, search for them quickly, and even manage them efficiently, making your daily workflow smoother and more productive. 🚀

---

## Features ✨  
- 💾 Save important links with custom keys for easy identification.  
- 🔍 Quickly search and filter saved links in real-time.  
- 📂 View all saved links in an organized list.  
- 📋 Copy links to the clipboard with one click.  
- ⏳ Simple keyboard shortcuts for faster access.  
- 🔔 Toast notifications for user feedback.  

---

## Tech Stack 🛠️  
- **Frontend**: React.js (using Vite for optimized performance).  
- **Database**: IndexedDB (via \`idb\` library for efficient local storage).  
- **Styling**: CSS for custom design.  
- **Notifications**: React Toastify for user interaction feedback.  

---

## Folder Structure 📂  
```
LinkKeeper/
- ├── src/
- │   ├── components/
- │   │   ├── Header.jsx       // Displays the app's header
- │   │   ├── AddLinks.jsx     // Component for adding new links
- │   │   ├── ViewLinks.jsx    // Component for viewing saved links
- │   │   ├── SearchLinks.jsx  // Component for searching links
- │   ├── App.jsx              // Main React component
- │   ├── index.css            // Global CSS
- │   └── main.jsx             // Entry point for React
- ├── public/
- │   ├── manifest.json        // Chrome Extension configuration
- ├── dist/                    // Build folder
- ├── package.json             // Project dependencies and scripts
- ├── README.md                // Project documentation
- └── .gitignore               // Files to be ignored by Git
```

---

## Setup Instructions 📝  

### 1. Clone the Repository  
```bash
https://github.com/PratikW09/LinkKeeper.git
cd linkkeeper
```

### 2. Install Dependencies  
```bash
npm install
```

### 3. Build the Project  
```bash
npm run build
```

### 4. Add the Extension to Chrome  
1. Open Chrome and go to \`chrome://extensions/\`.  
2. Enable **Developer Mode** (toggle at the top-right corner).  
3. Click **Load unpacked** and select the \`dist/\` folder generated after the build.  

---

## Usage Instructions 🚀  

1. **Add Links**:  
   - Press **Ctrl + M** or click **➕ Add Link** to save a new link with a unique key.  
2. **View All Links**:  
   - Press **Ctrl + V** or click **📂 View All Links** to see your saved links.  
   - Delete any link if not needed anymore.  
3. **Search Links**:  
   - Press **Ctrl + S** or click **🔍 Search Links** to search for saved links by key.  
4. **Copy Links**:  
   - Click the **📋 Copy** button next to a link to copy it to the clipboard instantly.  

---

## Screenshots 📸

### Add Links
![Add Links](assets/add-link-screenshot.png)

### View Links
![View Links](assets/view-links-screenshot.png)

### Search Links
![Search Links](assets/search-links-screenshot.png)
  

---

## Keyboard Shortcuts ⌨️  
- **Ctrl + M**: Open Add Link section.  
- **Ctrl + V**: Open View Links section.  
- **Ctrl + S**: Open Search Links section.  

---

## Contributing 🤝  
We welcome contributions! If you'd like to improve this project:  
1. Fork the repository.  
2. Make your changes.  
3. Submit a pull request.  

---

## License 📝  
This project is licensed under the MIT License.  

---

## Contact 📬  
For queries or suggestions, reach out at \`walalepratik09@gmail.com\`.  

