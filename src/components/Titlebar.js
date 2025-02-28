import React, { useState } from "react";
import "../styles/Titlebar.css";
import { FaRegStar } from "react-icons/fa";
import { BsFolder2 } from "react-icons/bs";
import { MdCloudDone } from "react-icons/md";
import { IoMdPerson } from "react-icons/io";

const TitleBar = () => {
  const [docName, setDocName] = useState("Untitled Spreadsheet");
  const [editing, setEditing] = useState(false);

  const handleNameChange = (e) => {
    setDocName(e.target.value);
  };

  const toggleEditing = () => {
    setEditing(!editing);
  };

  return (
    <div className="titlebar">
      <div className="top-bar">
        <div className="left-section">
          <img src="/icons/logo.svg" alt="Google Sheets" className="logo" />
          <div className="doc-container" onClick={toggleEditing}>
            {editing ? (
              <input
                type="text"
                value={docName}
                onChange={handleNameChange}
                onBlur={toggleEditing}
                autoFocus
                className="doc-input"
              />
            ) : (
              <span className="doc-name">{docName}</span>
            )}
            <FaRegStar className="star-icon" title="Star document" />
            <BsFolder2 className="move-icon" title="Move to folder" />
            <MdCloudDone className="save-status" title="Saved to Drive" />
          </div>
        </div>
        <div className="right-section">
          <IoMdPerson className="profile-icon" title="User Profile" />
        </div>
      </div>
      <div className="menu-bar">
        <div>File</div>
        <div>Edit</div>
        <div>View</div>
        <div>Insert</div>
        <div>Format</div>
        <div>Data</div>
        <div>Tools</div>
        <div>Extensions</div>
        <div>Help</div>
      </div>
    </div>
  );
};

export default TitleBar;
