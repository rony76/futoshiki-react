import React from 'react';
import './App.css';
import Instructions from "./components/Instructions/Instructions";
import GameWrapper from "./components/GameWrapper/GameWrapper";

function App() {
    const size = 5;

    return (
        <div className="App">
            <header className="App-header">
                <h2>FUTOSHIKI</h2>
            </header>
            <main>
                <GameWrapper size={size}/>
                <Instructions size={size}/>
            </main>
        </div>
    );
}

export default App;
