import React, { Component } from 'react';
import { render } from 'react-dom';

import { clipboard, ipcRenderer } from 'electron';

// import database from './database.js';

class Application extends Component {
  constructor() {
    super();

    this.state = {
      clippings: [
        {
          content: 'Test',
          id: 123,
        },
      ],
    };

    // this.fetchClippings = this.fetchClippings.bind(this);
    this.addClipping = this.addClipping.bind(this);
    this.handleWriteToClipboard = this.handleWriteToClipboard.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
  }

  componentDidMount() {
    ipcRenderer.on('create-new-clipping', this.addClipping);
    ipcRenderer.on('write-to-clipboard', this.handleWriteToClipboard);

    // this.fetchClippings();
  }

  // fetchClippings() {
  //   database('clippings')
  //     .select()
  //     .then((clippings) => this.setState({ clippings }));
  // }

  addClipping() {
    const content = clipboard.readText();

    database('clippings').insert({ content }).then(this.fetchClippings);
  }

  handleWriteToClipboard() {
    const clipping = this.state.clippings[0];
    if (clipping) writeToClipboard(clipping.content);
  }

  handleRemove(id) {
    database('clippings').where('id', id).delete().then(this.fetchClippings);
  }

  render() {
    return (
      <div className="container">
        <header className="controls">
          <button id="copy-from-clipboard" onClick={this.addClipping}>
            Copy from Clipboard
          </button>
        </header>

        <section className="content">
          <div className="clippings-list">
            {this.state.clippings.map((clippings) => (
              <Clipping
                content={clippings.content}
                id={clippings.id}
                key={clippings.id}
                onRemove={this.handleRemove}
              />
            ))}
          </div>
        </section>
      </div>
    );
  }
}

const Clipping = ({ content, id, onRemove }) => {
  return (
    <article className="clippings-list-item">
      <div className="clippings-text" disabled>
        {content}
      </div>
      <div className="clipping-controls">
        <button onClick={() => writeToClipboard(content)}>
          &rarr; Clipboard
        </button>
        <button>Update</button>
        <button className="remove-clipping" onClick={() => onRemove(id)}>
          Remove
        </button>
      </div>
    </article>
  );
};

const writeToClipboard = (content) => {
  clipboard.writeText(content);
};

render(<Application />, document.getElementById('application'));
