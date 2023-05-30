import React from 'react';
import './App.css';
import GameBoard from "./components/GameBoard/GameBoard";
import Instructions from "./components/Instructions/Instructions";

function App() {
    const size = 5;

    return (
        <div className="App">
            <header className="App-header">
                <h2>FUTOSHIKI</h2>
            </header>
            <main>
                <GameBoard size={size}/>
                <Instructions size={size}/>
            </main>
        </div>
    );
}

export default App;
