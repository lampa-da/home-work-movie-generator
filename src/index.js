import { render } from 'react-dom';
import React, {Component} from 'react';
import axios from 'axios'
import Generator from './Generator';

class App extends React.Component {
  render(){
    return (
      <div id='container'>
        <h1>Random Movie Generator</h1>
        <Generator />
      </div>
    )
  }
}

render(<App />, document.querySelector('#root'));