import React, { Component } from "react";
import Header from "./Header.js";
import NotesList from "./NotesList.js";

class App extends Component {
  //update state for the App component
  state = {
    notes: [
      {
        id: Date.now(),
        title: "",
        description: "",
        doesMatchSearch: true
      }
    ],
    searchText: ""
  };

  //define addNote method
  addNote = () => {
    const newNote = {
      id: Date.now(),
      title: "",
      description: "",
      doesMatchSearch: true
    };
    const newNotes = [newNote, ...this.state.notes];
    this.setState({ notes: newNotes });
  };

  //define an onType event handler method
  onType = (editNoteId, updatedKey, updatedValue) => {
    const updateIdMatch = (note) => {
      if (note.id !== editNoteId) {
        return note;
      } else {
        if (updatedKey === "title") {
          return {
            ...note,
            title: updatedValue
          };
        } else {
          return {
            ...note,
            description: updatedValue
          };
        }
      }
    };
    const updatedNotes = this.state.notes.map(updateIdMatch);
    this.setState({ notes: updatedNotes });
  };

  //define onSearch method
  onSearch = (e) => {
    const searchText = e.target.value.toLowerCase();
    const updatedNotes = this.state.notes.map((note) => {
      /* If the search field is empty, then
      we set the doesMatchSearch value for every note to true. */
      if (!searchText) {
        return {
          ...note,
          doesMatchSearch: true
        };
      } else {
        const title = note.title.toLowerCase();
        const description = note.description.toLowerCase();
        const matchTitle = title.includes(searchText);
        const matchDescription = description.includes(searchText);
        const hasMatch = matchTitle || matchDescription;
        return {
          ...note,
          doesMatchSearch: hasMatch
        };
      }
    });
    this.setState({
      searchText: searchText,
      notes: updatedNotes
    });
  };

  //Add delete functionality to the UI
  remove = (deleteNoteId) => {
    const notIdMatch = (note) => note.id !== deleteNoteId;
    const updatedNotes = this.state.notes.filter(notIdMatch);
    this.setState({ notes: updatedNotes });
  };
  componentDidUpdate() {
    //save notes data to local storage
    const noteString = JSON.stringify(this.state.notes);
    localStorage.setItem("savedNotes", noteString);
  }
  //Define the componentDidMount method to read out whatever value is saved in local storage
  componentDidMount() {
    const noteString = localStorage.getItem("savedNotes");
    if (noteString) {
      const savedNotes = JSON.parse(noteString);
      this.setState({ notes: savedNotes });
    }
  }
  render() {
    return (
      <div>
        <Header
          searchText={this.state.searchText}
          addNote={this.addNote}
          onSearch={this.onSearch}
        />
        <NotesList
          notes={this.state.notes}
          onType={this.onType}
          //Add an event handler based on the action the user will take to delete their note
          remove={this.remove}
        />
      </div>
    );
  }
}

export default App;
