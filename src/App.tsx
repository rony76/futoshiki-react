import React from 'react';
import './App.css';
import GameLoader from "./components/GameLoader/GameLoader";

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <h2>FUTOSHIKI</h2>
            </header>
            <main>
                <GameLoader />
            </main>
        </div>
    );
}

export default App;
