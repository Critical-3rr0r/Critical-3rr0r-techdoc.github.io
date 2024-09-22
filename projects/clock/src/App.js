import logo from './logo.svg';
import './App.css';
import { useDispatch } from "react-redux";
import sound from "./sounds/beep.mp3";
console.log(Math.floor(1602000 / 60 / 1000) + ":" + Math.floor(1602000 / 1000 - (Math.floor(1602000 / 60 / 1000) * 60)));
function App(props) {
    let dispatch = useDispatch();
    let { sessionTimeStore, breakTimeStore } = props;
    let sessTime = Math.floor(sessionTimeStore / 60 / 1000);
    let brkTime = Math.floor(breakTimeStore / 60 / 1000);
    const beeper = document.getElementById("beep");
    console.log(beeper);
    if (props.sessionTime === 0 || props.breakTime === 0) {
        beeper.volume = .5;
        beeper.play();
    }
    return (
    <div className="App">
      <header className="App-header">
              <div className="lengths">
                  <div id="break">
                    <span id="break-label">Break Length</span>
                      <div>
                          <button className="add-subtract" id="break-increment" onClick={() => dispatch({ type: "BREAK+" })}>+</button>
                      <span id="break-length">{brkTime}</span>
                            <button className="add-subtract" id="break-decrement" onClick={() => dispatch({ type: "BREAK-" })}>-</button>
                     </div>
                  </div>
                  <div id="session">
                      <span id="session-label">Session Length</span>
                      <div>
                            <button className="add-subtract" id="session-increment" onClick={() => dispatch({ type: "SESS+" })}>+</button>
                          <span id="session-length">{sessTime}</span>
                            <button className="add-subtract" id="session-decrement" onClick={() => dispatch({ type: "SESS-" })}>-</button>
                      </div>
                  </div>
              </div>
              <Clock props={props} />
              <audio id="beep" src={sound} type="audio/mpeg"></audio>
      </header>
    </div>
  );
}
function Clock(props) {
    const dispatch = useDispatch();
    const beeper = document.getElementById("beep");
    //logic to tick timer down while in "play" state and switch state when timer hits 0
    if (props.props.session === "session-play" || props.props.session === "break-play") {
        let a = setInterval(() => {
            if (props.props.session === "session-play" || props.props.session === "break-play") {
                dispatch({ type: "RUNNING" });
                clearInterval(a);
            } else {
                clearInterval(a);
            }
        }, 1000);
    }
       // Logic to display the time in MM:SS format
    let sessTimeSecs = 0;
    let breakTimeSecs = 0;
    let sessTimeMins = Math.floor(props.props.sessionTime / 60 / 1000);
    let brkTimeMins = Math.floor(props.props.breakTime / 60 / 1000);
    if (Math.floor(props.props.sessionTime / 60 / 1000) < 10) {
        sessTimeMins = "0" + Math.floor(props.props.sessionTime / 60 / 1000);
    } else {
        sessTimeMins = Math.floor(props.props.sessionTime / 60 / 1000);
    }
        console.log(props.props.session);
    if (Math.floor(props.props.breakTime / 60 / 1000) < 10) {
        brkTimeMins = "0" + Math.floor(props.props.breakTime / 60 / 1000);
    } else {
        brkTimeMins = Math.floor(props.props.breakTime / 60 / 1000);
    }
    if (Math.floor(props.props.sessionTime / 1000) - (Math.floor(props.props.sessionTime / 60 / 1000) * 60) < 10) {
         sessTimeSecs = "0" + (Math.floor(props.props.sessionTime / 1000) - (Math.floor(props.props.sessionTime / 60 / 1000) * 60))
    } else {
         sessTimeSecs = (Math.floor(props.props.sessionTime / 1000) - (Math.floor(props.props.sessionTime / 60 / 1000) * 60));
    }
    if (Math.floor(props.props.breakTime / 1000) - (Math.floor(props.props.breakTime / 60 / 1000) * 60) < 10) {
        breakTimeSecs = "0" + (Math.floor(props.props.breakTime / 1000) - (Math.floor(props.props.breakTime / 60 / 1000) * 60))
    } else {
        breakTimeSecs = (Math.floor(props.props.breakTime / 1000) - (Math.floor(props.props.breakTime / 60 / 1000) * 60));
    }
    
    let timer = (sessTimeMins + ":" + sessTimeSecs);
    if (props.props.session === "break-play" || props.props.session === "break-stop") {
        timer = (brkTimeMins + ":" + breakTimeSecs);
    }
    // Determine the type of sessio based on the session state to set timer text
    let sessType = "";
    let isRed;
    if (parseInt(sessTimeMins) === 0 || parseInt(brkTimeMins) === 0) {
        isRed = true;
    } else {
        isRed = false;
    }
    let playPause = "Play";
    let buttonDispatch = "PLAY"
    switch (props.props.session) {
        case "session-stop":
            sessType = "Session";
            playPause = "Play";
            buttonDispatch = "PLAY";
            break;
        case "session-play":
            sessType = "Session";
            playPause = "Pause";
            buttonDispatch = "PAUSE";
            break;
        case "break-stop":
            sessType = "Break";
            playPause = "Play";
            buttonDispatch = "PLAY";
            break;
        case "break-play":
            sessType = "Break";
            playPause = "Pause";
            buttonDispatch = "PAUSE";
            break;
        default:
            sessType = "";
            break;
    }
    
        console.log(timer, "timer");
    return (
        <div>
            <div className="timer">
                <p id="timer-label">{sessType}</p>
                <span className={`${isRed ? "red" : ""}`} id="time-left">{timer}</span>
            </div>
            <div className="timer-buttons">
                <button id="start_stop" onClick={() => dispatch({ type: buttonDispatch })}>{playPause}</button>
               
                <button id="reset" onClick={() => { dispatch({ type: "RESET" }); beeper.pause(); beeper.currentTime = 0; }}>Restart</button>
            </div>
        </div>
);
}
export default App;
