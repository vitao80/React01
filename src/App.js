import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import Header from './components/Header';
import Routes from './routes';

function App() {
  return (
    //precisa do BrowserRouter por volta do uso do Routes
    <BrowserRouter> 
      <Header />
      <Routes />
    </BrowserRouter>
    /*
    <div className="App">
      <h1>Hello World</h1>
    </div>
    */
  );
}

export default App;
