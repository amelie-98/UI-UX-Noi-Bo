import React from 'react';
import { Router} from "react-router-dom";
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {history} from './helpers/history/history';
import './App.css';
import Main from './main';
import GlobalLoading from './components/GlobalLoading';

function App() {
  return (
    <div className="App">
      <Router history={history}>
        <Main/>
        <GlobalLoading/>
        <ToastContainer/>
      </Router>
    </div>
  );
}

export default App;