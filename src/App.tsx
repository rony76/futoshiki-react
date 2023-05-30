import React from 'react';
import './App.css';
import Grid from "./components/Grid/Grid";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h2>FUTOSHIKI</h2>
      </header>
      <main>
        <Grid size={5} />
      </main>
    </div>
  );
}

export default App;
