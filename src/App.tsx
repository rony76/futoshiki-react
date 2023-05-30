import React from 'react';
import './App.css';
import Grid from "./components/Grid/Grid";
import Instructions from "./components/Instructions/Instructions";

function App() {
    const size = 5;

    return (
        <div className="App">
            <header className="App-header">
                <h2>FUTOSHIKI</h2>
            </header>
            <main>
                <Grid size={size}/>
                <Instructions size={size}/>
            </main>
        </div>
    );
}

export default App;
