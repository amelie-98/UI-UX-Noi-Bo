import React from 'react';
import {
  BrowserRouter as Router,
} from "react-router-dom";
import {history} from './helpers/history/history';
import './App.css';
import Main from './main';

function App() {
  return (
    <div className="App">
      <Router history={history}>
        <Main/>
      </Router>
    </div>
  );
}

export default App;