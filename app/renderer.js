import React, { Component } from 'react';
import { render } from 'react-dom';

class Application extends Component {
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
            <Clipping content={'test'} />
            <Clipping content={'test'} />
            <Clipping content={'test'} />
            <Clipping content={'test'} />
            <Clipping content={'test'} />
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
