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
    <div className="App" id="drum-machine">
        <header className="App-header">
            <div id="cont">
                  <Buttons />
                  <div id="display-box">
                      <span id="display">
                      </span>
                  </div>
            </div>
        </header>
    </div>
  );
}
const clickHandler = (index) => {
    console.log("clicked");
    let audioElement = document.getElementById(KEY[index]);
    document.getElementById("display").innerHTML = "Playing: " + AUDIOFILES[index].match(/([A-Z])\w+-?\d?_?\d?/g);
        console.log(audioElement);
        audioElement.play();
    if (audioElement.currentTime > 0) {
        audioElement.pause();
        audioElement.currentTime = 0;
        audioElement.play();
    }
}
let aud = ""
AUDIOFILES.forEach((audio) => {
    aud += " " + audio;
})
console.log(aud);
function Buttons() {
    const AUDIO1 = AUDIOFILES;
    window.addEventListener("keydown", (e) => {
        if (KEY.includes(e.key.toUpperCase())) {
            let audioElement = document.getElementById(KEY[KEY.indexOf(e.key.toUpperCase())]);
            document.getElementById("display").innerHTML = "Playing: " + AUDIOFILES[KEY.indexOf(e.key.toUpperCase())].match(/([A-Z])\w+-?\d?_?\d?/g);
            audioElement.play();
            if (audioElement.currentTime > 0) {
                audioElement.pause();
                audioElement.currentTime = 0;
                audioElement.play();
            }
        }
    });
    return (
        <div id="pad">
            {AUDIO1.map((audio, index) => {
                console.log(index);
                return (
                    <div  id={index}>
                        <button className="drum-pad" id={"btn-" + index} onClick={() => clickHandler(index)}>{KEY[index]}<Audio audioFile={audio} indexNum={index} /></button>
                        
                    </div>
                    );
            })}
        </div>
            );
}
function Audio(props) {

    return (
            <audio className="clip" src={props.audioFile} id={KEY[props.indexNum]}></audio>          
    );
}
export default App;
