import './App.css';

import MyHeader from './common/header/index.js';
import MyFooter from './common/footer/index.js';
import Home from './components/home/home';
import './index.css';
import { useState } from 'react';

function App() {
  return (
    <>
      <MyHeader />
      <Home />
      <MyFooter />
    </>
  );
}

export default App;
