import React from "react";

const Header = (props) => (
  <header className="app-header">
    <h1 className="app-header-title">Super Sticky Notes</h1>
    <aside className="app-header-controls">
      <button className="new-note" onClick={props.addNote}>
        + New Note
      </button>
      <input
        type="text"
        placeholder="Type here to search..."
        className="search"
        value={props.searchText}
        //Add an onChange event listener to the Header's text input.
        onChange={props.onSearch}
      />
    </aside>
  </header>
);

export default Header;
