import React, { Component } from 'react';
import './App.css';
import Canvas from './components/Canvas';

class App extends Component {
  render() {
    return (
      <main>
        <h2>Drawing App</h2>
        <div className="canvas-container">
          <Canvas />
        </div>
      </main>
    );
  }
}
export default App;