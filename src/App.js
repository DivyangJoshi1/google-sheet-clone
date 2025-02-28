import React from "react";
import TitleBar from "./components/Titlebar";
import Spreadsheet from "./components/Spreadsheet";
import Toolbar from "./components/Toolbar";
import FormulaBar from "./components/FormulaBar";

const App = () => {
  return (
    <div className="app-container">
      <TitleBar />
      <Toolbar />
      <FormulaBar />
      <Spreadsheet />
    </div>
  );
};

export default App;
