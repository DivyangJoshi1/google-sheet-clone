import React, { useState, useEffect } from "react";
import { MdFunctions } from "react-icons/md";
import { IoMdArrowDropdown } from "react-icons/io";
import "../styles/spreadsheet.css";

const FormulaBar = ({ selectedCell, cells, setCells }) => {
  const [formula, setFormula] = useState("");
  const [showTooltip, setShowTooltip] = useState(false);

  // Ensure selectedCell is always initialized as an object
  const cell = selectedCell || { row: null, col: null };

  // Update formula state when a new cell is selected
  useEffect(() => {
    if (cell.row !== null && cell.col !== null) {
      const currentCellValue = cells[cell.row][cell.col];
      setFormula(currentCellValue || ""); // Set formula from the selected cell
    }
  }, [cell, cells]);

  const handleFormulaChange = (e) => {
    let input = e.target.value;

    // Automatically prepend "=" if not present
    if (input && !input.startsWith("=")) {
      input = "=" + input;
    }

    setFormula(input); // Update formula in state
    updateCell(input);  // Update the cell with the formula
  };

  const updateCell = (newFormula) => {
    if (cell.row !== null && cell.col !== null) {
      const newCells = [...cells];
      newCells[cell.row][cell.col] = newFormula;
      setCells(newCells);
    }
  };

  return (
    <div className="formula-bar">
      <div
        className="formula-cell-indicator"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        {cell.row !== null && cell.col !== null
          ? `${String.fromCharCode(65 + cell.col)}${cell.row + 1}`
          : "A1"}
        <IoMdArrowDropdown size={16} className="dropdown-icon" />
        {showTooltip && (
          <div className="named-range-tooltip">
            <strong>Manage named ranges</strong>
            <br />
            Create a named range by selecting cells and entering the desired name into the text box.
          </div>
        )}
      </div>
      <div className="formula-icon">
        <MdFunctions size={20} />
      </div>
      <input
        type="text"
        className="formula-input"
        value={formula}
        onChange={handleFormulaChange}
        placeholder="Enter formula"
      />
    </div>
  );
};

export default FormulaBar;
