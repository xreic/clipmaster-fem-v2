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
          <div className="clippings-list"></div>
        </section>
      </div>
    );
  }
}

render(<Application />, document.getElementById('application'));
