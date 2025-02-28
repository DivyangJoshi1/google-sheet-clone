import React, { useState } from "react";
import "../styles/spreadsheet.css";

const Cell = ({ row, col, value, onChange, onSelect, isSelected }) => {
  return (
    <div
      className={`cell ${isSelected ? "selected" : ""}`}
      contentEditable
      suppressContentEditableWarning={true}
      onBlur={(e) => onChange(row, col, e.target.innerText)}
      onClick={() => onSelect(row, col)}
    >
      {value}
    </div>
  );
};

export default Cell;
