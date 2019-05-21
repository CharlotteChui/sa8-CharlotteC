import React, { Component } from 'react';

class InputBar extends Component {
  constructor(props) {
    super(props);
    this.state = { newTitle: '' };
    this.onInputChange = this.onInputChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onInputChange(event) {
    this.setState({ newTitle: event.target.value });
  }

  onSubmit(event) {
    event.preventDefault();
    console.log('creating new note');
    // eslint-disable-next-line react/destructuring-assignment
    this.props.addNote({
      title: this.state.newTitle,
    });
    this.setState({ newTitle: '' });
  }

  render() {
    return (
      // eslint-disable-next-line react/jsx-filename-extension
      <div id="input_bar">
        <input placeholder="Note Title" onChange={this.onInputChange} value={this.state.newTitle} />
        <button type="button" onClick={this.onSubmit}> Create Note </button>
      </div>
    );
  }
}

export default InputBar;
