import logo from './logo.svg';
import './App.css';
import { useState } from "react";
const AUDIOSRC = require.context("./Music", true);
console.log(AUDIOSRC.keys());
const AUDIOFILES = AUDIOSRC.keys().map(file => AUDIOSRC(file));
console.log(AUDIOFILES, "audiofiles");
const KEY = ["Q", "W", "E", "A", "S", "D", "Z", "X", "C"];
function App() {
  return (
    <div className="App">
        <header className="App-header">
            <div id="cont">
                <Buttons />
            </div>
        </header>
    </div>
  );
}
function Buttons() {
    const clickHandler = (audio,) => {

    }
    const keyHandler = (event, key, audio) => {
         
    }
    return (
        <div id="pad">
            {AUDIOFILES.map((audio, index) => {
                return (
                    <div onClick={clickHandler(audio)}>
                    </div>
                    );
            })}
        </div>
            );
}
export default App;
