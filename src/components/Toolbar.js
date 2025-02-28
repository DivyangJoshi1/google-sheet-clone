import React from "react";
import "../styles/toolbar.css";
import {
  FaUndo, FaRedo, FaPrint, FaBold, FaItalic, FaUnderline, FaAlignLeft, FaAlignCenter, FaAlignRight, FaPaintBrush, FaTable, FaSortAmountDown, FaSortAmountUp, FaEllipsisH, FaSearch
} from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";
import { MdFormatPaint } from "react-icons/md";
import { TbLetterSpacing, TbRowInsertBottom } from "react-icons/tb";

const Toolbar = () => {
  return (
    <div className="toolbar">
      <div className="toolbar-section">
        <button className="toolbar-btn"><FaSearch /></button>
        <button className="toolbar-btn"><FaUndo /></button>
        <button className="toolbar-btn"><FaRedo /></button>
        <button className="toolbar-btn"><FaPrint /></button>
      </div>
      <div className="toolbar-section">
        <select className="toolbar-dropdown">
          <option>100%</option>
          <option>75%</option>
          <option>50%</option>
        </select>
      </div>
      <div className="toolbar-section">
        <button className="toolbar-btn">$</button>
        <button className="toolbar-btn">%</button>
        <button className="toolbar-btn">.0</button>
        <button className="toolbar-btn">.00</button>
        <button className="toolbar-btn"><TbLetterSpacing /></button>
      </div>
      <div className="toolbar-section">
        <input type="number" className="toolbar-input" value="10" />
        <button className="toolbar-btn">-</button>
        <button className="toolbar-btn">+</button>
      </div>
      <div className="toolbar-section">
        <button className="toolbar-btn"><FaBold /></button>
        <button className="toolbar-btn"><FaItalic /></button>
        <button className="toolbar-btn"><FaUnderline /></button>
        <button className="toolbar-btn"><MdFormatPaint /></button>
      </div>
      <div className="toolbar-section">
        <button className="toolbar-btn"><FaAlignLeft /></button>
        <button className="toolbar-btn"><FaAlignCenter /></button>
        <button className="toolbar-btn"><FaAlignRight /></button>
      </div>
      <div className="toolbar-section">
        <button className="toolbar-btn"><FaSortAmountDown /></button>
        <button className="toolbar-btn"><FaSortAmountUp /></button>
      </div>
      <div className="toolbar-section">
        <button className="toolbar-btn"><FaTable /></button>
        <button className="toolbar-btn"><TbRowInsertBottom /></button>
      </div>
      <div className="toolbar-section more-options">
        <button className="toolbar-btn more-btn"><FaEllipsisH /></button>
      </div>
    </div>
  );
};

export default Toolbar;
