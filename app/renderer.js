import React, { Component } from 'react';
import { render } from 'react-dom';

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

render(<Application />, document.getElementById('application'));
