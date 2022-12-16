import React from 'react';
import './App.scss';
import Appbar from 'component/AppBar/Appbar'
import Broadbar from 'component/BroadBar/Broadbar'
import Broadcontent from 'component/BroadContent/Broadcontent'

function App() {
  return (
    <div className="mern_stack_">
      <Appbar />
      <Broadbar />
      <Broadcontent />
    </div>
  );
}

export default App;
