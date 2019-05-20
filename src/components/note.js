/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable eslint(jsx-a11y/no-static-element-interactions) */

import React, { Component } from 'react';
import Draggable from 'react-draggable';
import Textarea from 'react-textarea-autosize';
import marked from 'marked';

class Note extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
      title: this.props.note.title,
      text: this.props.note.text,
    };

    this.onDrag = this.onDrag.bind(this);
    this.onTitleChange = this.onTitleChange.bind(this);
    this.onTextChange = this.onTextChange.bind(this);
    this.renderTitle = this.renderTitle.bind(this);
    this.renderContent = this.renderContent.bind(this);
    this.onDeleteClick = this.onDeleteClick.bind(this);
    this.changeToggle = this.changeToggle.bind(this);
  }

  // onDrag makes sure that notes stay within the boundaries
  onDrag(event, position) {
    console.log(this.props.maxZ);
    if (position.y > -50 && position.x > 0) {
      this.props.update(this.props.id, { x: position.x, y: position.y });
    }
  }

  // function to toggle a title change
  onTitleChange(event) {
    this.setState({ title: event.target.value });
  }

  onTextChange(event) {
    this.setState({ text: event.target.value });
  }

  onDeleteClick(event) {
    event.preventDefault();
    this.props.deleteNote(this.props.id);
  }

  changeToggle() {
    if (!this.state.isEditing) {
      console.log('Not editing!');
    }
    else {
      this.props.update(this.props.id, this.state);
    }
    this.setState(prevState => ({
      isEditing: !prevState.isEditing,
    }));
  }

  // render the title
  // if editing the title, return a changed value
  renderTitle() {
    if (this.state.isEditing) {
      return (
        <div className="title">
          <input onChange={this.onTitleChange} value={this.state.title} />
        </div>
      );
    } else {
      // console.log(this.props.note);
      // console.log('bye');
      return (
        this.props.note.title
      );
    }
  }

  // renders content
  // if editing, change the content after using a click to start
  renderContent() {
    if (this.state.isEditing) {
      return (
        <div className="body">
          <div className="content" role="button" onClick={this.onStart}>
            <Textarea className="textbox" onChange={this.onTextChange} value={this.state.text} />
          </div>
        </div>
      );
    }
    // if not editing, just return the existing content
    else {
      return (
        <div className="body2">
          <div className="content" dangerouslySetInnerHTML={{ __html: marked(this.props.note.text || '') }} />
        </div>
      );
    }
  }

  render() {
    if (!this.state.isEditing) {
      return (
        <Draggable
          handle=".note-mover"
          grid={[25, 25]}
          defaultPosition={{ x: 50, y: 50 }}
          position={{ x: this.props.note.x, y: this.props.note.y }}
          onStart={this.onStartDrag}
          onDrag={this.onDrag}
          onStop={this.onStopDrag}
        >
          <div className="note" style={{ zIndex: this.props.note.z }}>
            <div className="nav-bar">
              <div className="title"> {this.renderTitle()} </div>
              <div className="right">
                <div className="icon"><i onClick={this.onDeleteClick} role="button" className="fas fa-trash" /></div>
                <div className="icon"><i onClick={this.changeToggle} role="button" className="fas fa-edit" /></div>
                <div className="note-mover"><i className="fas fa-arrows-alt" /></div>
              </div>
            </div>
            {this.renderContent()}
          </div>
        </Draggable>
      );
    }
    // if it is editing, then change the form
    else {
      return (
        <Draggable
          handle=".note-mover"
          grid={[25, 25]}
          defaultPosition={{ x: 50, y: 50 }}
          position={{ x: this.props.note.x, y: this.props.note.y }}
          onStart={this.onStartDrag}
          onDrag={this.onDrag}
          onStop={this.onStopDrag}
        >
          <div className="note" style={{ zIndex: this.props.maxZ }}>
            <div className="nav-bar">
              <div className="title"> {this.renderTitle()} </div>
              <div className="right">
                <div className="icon"><i onClick={this.onDeleteClick} role="button" className="fas fa-trash" /></div>
                <div className="icon"><i onClick={this.changeToggle} role="button" className="fas fa-check-circle" /></div>
                <div className="note-mover"><i className="fas fa-arrows-alt" /></div>
              </div>
            </div>
            {this.renderContent()}
          </div>
        </Draggable>
      );
    }
  }
}

export default Note;
