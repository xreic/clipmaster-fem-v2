import React, { Component } from 'react';
import { render } from 'react-dom';

import { clipboard, ipcRenderer } from 'electron';

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

    this.addClipping = this.addClipping.bind(this);
    this.handleWriteToClipboard = this.handleWriteToClipboard.bind(this);
  }

  componentDidMount() {
    ipcRenderer.on('create-new-clipping', this.addClipping);
    ipcRenderer.on('write-to-clipboard', this.handleWriteToClipboard);
  }

  addClipping() {
    const { clippings } = this.state;

    const content = clipboard.readText();
    const id = Date.now();

    const clipping = { id, content };

    this.setState({
      clippings: [clipping, ...clippings],
    });
  }

  handleWriteToClipboard() {
    const clipping = this.state.clippings[0];
    if (clipping) writeToClipboard(clipping.content);
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
              <Clipping content={clippings.content} key={clippings.id} />
            ))}
          </div>
        </section>
      </div>
    );
  }
}

const Clipping = ({ content }) => {
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
      </div>
    </article>
  );
};

const writeToClipboard = (content) => {
  clipboard.writeText(content);
};

render(<Application />, document.getElementById('application'));
