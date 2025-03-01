# Google Sheets Clone  

A web-based spreadsheet application that mimics **Google Sheets**, built using **React.js**. This project enables users to enter data, apply formulas, and perform spreadsheet operations with a UI similar to Google Sheets.  

Demo Video : https://www.loom.com/share/5702ae73d91c43bba79e7e64443cae78?sid=06a4ec67-c91d-408d-b1a6-0f157e9bfc92

---

## 🚀 Tech Stack & Data Structures Used  

### **Frontend**  
- **React.js** - Component-based UI development.  
- **HTML & CSS** - Structuring and styling.  
- **Vanilla JavaScript** - Core logic for spreadsheet interactions.  

### **State Management & Data Handling**  
- **React useState & useEffect** - Manages spreadsheet cell updates and dependencies.  
- **2D Arrays** (`grid[row][col]`) - Used to represent the spreadsheet grid efficiently.  
- **HashMap (JS Object)** - Stores computed cell dependencies for formula evaluation.  

### **Formula Parsing & Evaluation**  
- **Regex-based Parsing** - Identifies and evaluates formulas (e.g., `=SUM(A1:A5)`).  
- **Dependency Graph (Adjacency List)** - Keeps track of formula dependencies to update cells dynamically.  

### **Why These Choices?**  
- **React.js** makes UI updates smooth and efficient.  
- **2D Arrays** allow fast cell access and updates.  
- **HashMaps & Dependency Graphs** ensure efficient formula evaluation without unnecessary recalculations.  

---

## 📌 Features  

✅ **Spreadsheet UI** - Google Sheets-like interface.  
✅ **Data Entry & Formatting** - Input text, numbers, and formulas.  
✅ **Formula Support** - Supports `SUM`, `AVERAGE`, `MAX`, `MIN`, `COUNT`, etc.  
✅ **Cell Dependency Handling** - Automatically updates dependent cells.  
✅ **Undo/Redo Actions** - Manage changes efficiently.  
✅ **Drag & Drop Support** - Move or copy cell content dynamically.  

---

## ⚡ Installation & Running the Project  

### **1️⃣ Clone the Repository**  
```sh
git clone https://github.com/DivyangJoshi1/google-sheet-clone.git
cd google-sheet-clone
```

### **2️⃣ Install Dependencies**
```sh
npm install
npm install react-icons
```

### **3️⃣ Start the Development Server**
```sh
npm start

The app will run at http://localhost:3000.
