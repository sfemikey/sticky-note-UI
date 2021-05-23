import React, { Component } from "react";

//Convert the Note component to a class
class Note extends Component {
  updateTitle = (e) => {
    const updatedValue = e.target.value;
    const editNoteId = this.props.note.id;
    this.props.onType(editNoteId, "title", updatedValue);
  };
  updateDescription = (e) => {
    const updatedValue = e.target.value;
    const editNoteId = this.props.note.id;
    this.props.onType(editNoteId, "description", updatedValue);
  };

  render() {
    return (
      <li className="note">
        <input
          type="text"
          value={this.props.note.title}
          onChange={this.updateTitle}
          placeholder="Title"
          className="note-text"
        />
        <textarea
          value={this.props.note.description}
          onChange={this.updateDescription}
          placeholder="Description..."
          className="note-description"
        />
        <span className="note-delete">X</span>
      </li>
    );
  }
}

export default Note;
