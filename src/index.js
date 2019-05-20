/* eslint class-methods-use-this: ["error", { "exceptMethods": ["deleteNote"] }] */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Immutable from 'immutable';
// import * as firebasedb from './services/datastore';
import InputBar from './components/input_bar';
import Note from './components/note';
import './style.scss';
// at top
import io from 'socket.io-client';
const socketserver = 'http://localhost:9090';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: Immutable.Map(),
      newID: 3,
      maxZ: 1,
    };
    this.addNote = this.addNote.bind(this);
    this.dragNote = this.dragNote.bind(this);
    this.deleteNote = this.deleteNote.bind(this);
    this.update = this.update.bind(this);
    this.push = this.push.bind(this);
    this.socket = io(socketserver);
    this.socket.on('connect', () => { console.log('socket.io connected'); });
    this.socket.on('disconnect', () => { console.log('socket.io disconnected'); });
    this.socket.on('reconnect', () => { console.log('socket.io reconnected'); });
    this.socket.on('error', (error) => { console.log(error); });
  }

  componentDidMount() {

    // do
    this.socket.on('notes', (notes) => {
      // where you handle all the setState and immutable stuff
      // keep this
      this.setState({ notes: Immutable.Map(notes) });
    });      
    firebasedb.fetchZ((z) => {
      this.setState({ maxZ: z });
    });
  }

  onStartUpdate(id, note) {
    if (note.zIndex !== (this.state.maxZ - 1)) {
      const fields = { zIndex: this.state.maxZ };
      firebasedb.updateMaxZ(this.state.maxZ + 2);
      const newNote = Object.assign({}, this.state.notes.id, fields);
      firebasedb.update(id, newNote);
    }
  }

  addNote(newTitle) {
    const note = {
      title: newTitle.title,
      text: 'This is a new note!',
      x: 200,
      y: 400,
      // still working on z Index
      z: this.state.maxZ,
      id: this.state.newID,
    };
    this.state.newID += 1;
    this.setState(prevState => ({
      notes: prevState.notes.set(note.id, note),
    }));
    console.log(note);
    this.state.maxZ = this.state.maxZ + 1;
    firebasedb.updateMaxZ(this.state.maxZ + 1);
    // firebasedb.addNote(note);
    this.socket.emit('createNote', title);
  }


  push(notes) {
    this.setState(prevState => ({
      notes: this.setState({ history: prevState.history.unshift(notes) }),
    }));
  }


  dragNote(id, field) {
    this.setState(prevState => ({
      notes: prevState.notes.update(id, (n) => { return Object.assign({}, n, field); }),
    }));
    this.state.maxZ = this.state.maxZ + 1;
  }

  deleteNote(id) {
    // firebasedb.deleteNote(id);
    this.socket.emit('deleteNote', id);
  }

  update(id, field) {
    // field.zIndex = this.state.maxZ;
    // firebasedb.update(id, Object.assign({}, this.state.notes.get(id), field));
    // firebasedb.updateZ(id, this.state.maxZ);
    this.socket.emit('updateNote', id, fields);

  }


  render() {
    return (
      <div id="finished-note">
        <header>
          <h1>My Notes</h1>
          <InputBar addNote={text => this.addNote(text)} />
        </header>

        <div>
          {this.state.notes.entrySeq().map(([id, note]) => (
            <Note
              notes={this.state.notes}
              note={note}
              id={id}
              key={id}
              deleteNote={this.deleteNote}
              update={this.update}
              push={notes => this.push(notes)}
              onStartUpdate={this.onStartUpdate}
              maxZ={this.state.maxZ}
            />
          ))}
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('main'));
