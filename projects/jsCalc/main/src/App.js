import logo from './logo.svg';
import './App.css';
import { useDispatch } from 'react-redux'
function App(props) {
  return (
    <div className="App">
      <header className="App-header">
              <div className="Calc">
                  <div className="display-holder">
                      <span id="output">
                          {props.output}
                      </span>
                      <span id="display">
                          {props.input}
                      </span>
                  </div>
                  <Buttons props={props} />
        </div>
      </header>
    </div>
  );
}
function Buttons(props) {
    const dispatch = useDispatch();
    return (
        <div id="holder">
            <div id="top-row">
                <button id="clear" onClick={() => dispatch({ type: "CLEAR" })}>AC</button>
                <button id="divide" onClick={() => dispatch({type: "DIVIDE"})}>/</button>
                <button id="multiply" onClick={() => dispatch({ type: "MULTIPLY" })}>X</button>
            </div>
            <div id="nums">
                <button id="nine" onClick={() => dispatch({ type: "NINE" })}>9</button>
                <button id="eight" onClick={() => dispatch({ type: "EIGHT" })}>8</button>
                <button id="seven" onClick={() => dispatch({ type: "SEVEN" })}>7</button>
                <button id="six" onClick={() => dispatch({ type: "SIX" })}>6</button>
                <button id="five" onClick={() => dispatch({ type: "FIVE" })}>5</button>
                <button id="four" onClick={() => dispatch({ type: "FOUR" })}>4</button>
                <button id="three" onClick={() => dispatch({ type: "THREE" })}>3</button>
                <button id="two" onClick={() => dispatch({ type: "TWO" })}>2</button>
                <button id="one" onClick={() => dispatch({ type: "ONE" })}>1</button>
                <button id="zero" onClick={() => dispatch({ type: "ZERO" })}>0</button>
                <button id="decimal" onClick={() => dispatch({ type: "DECIMAL" })}>.</button>
            </div>
            <div id="right-column">
                <button id="subtract" onClick={() => dispatch({ type: "SUBTRACT" })}>-</button>
                <button id="add" onClick={() => dispatch({ type: "ADD" })}>+</button>
                <button id="equals" onClick={() => dispatch({ type: "EQUALS" })}>=</button>
            </div>
        </div>
        );
}
export default App;
