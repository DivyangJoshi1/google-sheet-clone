import React, { useState, useEffect, useRef } from "react";
import "../styles/spreadsheet.css";
import { processFormula } from "../utils/mathFunctions";

const ROWS = 100;
const COLS = 26;

const Spreadsheet = () => {
  const [cells, setCells] = useState(
    Array.from({ length: ROWS }, () => Array(COLS).fill(""))
  );
  const [selectedCell, setSelectedCell] = useState({ row: null, col: null });
  const [inputValue, setInputValue] = useState("");
  const [selectionRange, setSelectionRange] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [draggingType, setDraggingType] = useState(null);
  const [draggedCells, setDraggedCells] = useState([]);
  const inputRef = useRef(null);
  const spreadsheetRef = useRef(null);
  

  useEffect(() => {
    if (selectedCell.row !== null && selectedCell.col !== null) {
      setInputValue(cells[selectedCell.row][selectedCell.col]);
      inputRef.current?.focus();
    }
  }, [selectedCell, cells]);

  const saveCellValue = () => {
    if (selectedCell.row === null || selectedCell.col === null) return;
    const newCells = [...cells];

    if (inputValue.startsWith("=")) {
      newCells[selectedCell.row][selectedCell.col] = processFormula(inputValue, cells);
    } else {
      newCells[selectedCell.row][selectedCell.col] = inputValue;
    }

    setCells(newCells);
  };

  const handleCellBlur = () => {
    saveCellValue();
  };

  const handleCellClick = (row, col) => {
    if (selectedCell.row !== null && selectedCell.col !== null) {
      saveCellValue();
    }
    setSelectedCell({ row, col });
    setSelectionRange(null);
  };

  const handleMouseDown = (row, col, event) => {
    if (event.target.classList.contains("fill-handle")) {
      setDraggingType("fill");
      setSelectionRange({ startRow: row, startCol: col, endRow: row, endCol: col });
      setDraggedCells([]);
    } else {
      setDraggingType("select");
      setSelectedCell({ row, col });
      setSelectionRange({ startRow: row, startCol: col, endRow: row, endCol: col });
    }
    setIsDragging(true);
  };

  const handleMouseMove = (event) => {
    if (!isDragging || !selectionRange) return;
    
    const cell = document.elementFromPoint(event.clientX, event.clientY);
    if (!cell || !cell.dataset.row || !cell.dataset.col) return;

    const endRow = parseInt(cell.dataset.row, 10);
    const endCol = parseInt(cell.dataset.col, 10);
    
    if (draggingType === "fill") {
      setDraggedCells([...draggedCells, { row: endRow, col: endCol }]);
    }

    setSelectionRange({ ...selectionRange, endRow, endCol });
  };

  const handleMouseUp = () => {
    if (draggingType === "fill" && selectionRange) {
      const { startRow, startCol, endRow, endCol } = selectionRange;
      const newCells = [...cells];
      const sourceValue = cells[startRow][startCol];

      for (let r = startRow; r <= endRow; r++) {
        for (let c = startCol; c <= endCol; c++) {
          if (r !== startRow || c !== startCol) {
            if (sourceValue.startsWith("=")) {
              newCells[r][c] = processFormula(sourceValue, newCells);
            } else {
              newCells[r][c] = sourceValue;
            }
          }
        }
      }

      setCells(newCells);
      setDraggedCells([]);
    }

    setIsDragging(false);
    setDraggingType(null);
  };

  const handleKeyDown = (e) => {
    if (!inputRef.current) return;

    const cursorPosition = inputRef.current.selectionStart;

    if (e.key === "ArrowLeft") {
      if (cursorPosition === 0) {
        saveCellValue();
        if (selectedCell.col > 0) {
          setSelectedCell({ row: selectedCell.row, col: selectedCell.col - 1 });
        }
        e.preventDefault();
      }
    } else if (e.key === "ArrowRight") {
      if (cursorPosition === inputValue.length) {
        saveCellValue();
        if (selectedCell.col < COLS - 1) {
          setSelectedCell({ row: selectedCell.row, col: selectedCell.col + 1 });
        }
        e.preventDefault();
      }
    } else if (e.key === "ArrowUp") {
      saveCellValue();
      if (selectedCell.row > 0) {
        setSelectedCell({ row: selectedCell.row - 1, col: selectedCell.col });
      }
      e.preventDefault();
    } else if (e.key === "ArrowDown") {
      saveCellValue();
      if (selectedCell.row < ROWS - 1) {
        setSelectedCell({ row: selectedCell.row + 1, col: selectedCell.col });
      }
      e.preventDefault();
    } else if (e.key === "Enter") {
      saveCellValue();
      if (selectedCell.row < ROWS - 1) {
        setSelectedCell({ row: selectedCell.row + 1, col: selectedCell.col });
      }
      e.preventDefault();
    }
  };

  return (
    <div
      className="spreadsheet-container"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      ref={spreadsheetRef}
    >
      <div className="spreadsheet-wrapper">
        <table className="spreadsheet">
          <thead>
            <tr>
              <th></th>
              {Array.from({ length: COLS }, (_, col) => (
                <th key={col}>{String.fromCharCode(65 + col)}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {cells.map((rowData, row) => (
              <tr key={row}>
                <td className="row-header">{row + 1}</td>
                {rowData.map((cell, col) => {
                  const isSelected = row === selectedCell.row && col === selectedCell.col;
                  const isInRange =
                    selectionRange &&
                    row >= selectionRange.startRow &&
                    row <= selectionRange.endRow &&
                    col >= selectionRange.startCol &&
                    col <= selectionRange.endCol;

                  const isDragged = draggedCells.some(
                    (draggedCell) => draggedCell.row === row && draggedCell.col === col
                  );

                  return (
                    <td
                      key={col}
                      data-row={row}
                      data-col={col}
                      className={`cell ${isSelected ? "selected" : ""} ${isInRange ? "highlight" : ""} ${isDragged ? "dragging" : ""}`}
                      onClick={() => handleCellClick(row, col)}
                      onMouseDown={(event) => handleMouseDown(row, col, event)}
                    >
                      {isSelected ? (
                        <input
                          ref={inputRef}
                          type="text"
                          value={inputValue}
                          onChange={(e) => setInputValue(e.target.value)}
                          onBlur={handleCellBlur}
                          onKeyDown={handleKeyDown}
                        />
                      ) : (
                        cell
                      )}
                      {isSelected && <div className="fill-handle"></div>}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Spreadsheet;
