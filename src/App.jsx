// src/App.jsx
import React from 'react';
import { useEffect, useState, useMemo } from './utils/hooks';

function App() {
  const [name1, setName1] = useState('tome');
  const [name2, setName2] = useState('jerry');
  const [showAll, setShowAll] = useState(false);

  const whoIsHere = useMemo(() => {
    return name1() + name2();
  });

  return (
    <div className="App">
      <h1>{whoIsHere()}</h1>
      
      <button onClick={() => {
        console.log('showAll', showAll());
        setShowAll(!showAll())
      }}>{showAll() ? 'Hide' : 'Show'}</button>
    </div>
  );
}

export default App;
