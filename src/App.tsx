import React from 'react';
import './App.css';
import GameWrapper from "./components/GameWrapper/GameWrapper";

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <h2>FUTOSHIKI</h2>
            </header>
            <main>
                <GameWrapper />
            </main>
        </div>
    );
}

export default App;
