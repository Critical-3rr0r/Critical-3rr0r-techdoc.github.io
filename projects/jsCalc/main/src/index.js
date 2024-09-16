import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from "react-redux";
import { connect } from "react-redux";
import { useDispatch } from "react-redux";
import { createStore } from "redux";
const root = ReactDOM.createRoot(document.getElementById('root'));
const initialState = {
    input: "0",
    output: "0"
}
let evaluation = 0;
const numberReducer = (state = initialState, action) => {
    let nstate = { ...state };
    
    if (state.newEquation === true) {
        nstate.output = "";
        nstate.input = evaluation.toString();
        nstate.newEquation = false;
        evaluation = 0;
    }
    if (action.type != "ZERO") {
        if (nstate.output === "") {
        } else {
            nstate.output = nstate.output.replace(/^0/, "");
        }
        nstate.input = nstate.input.replace(/^0/, "");
    }
    switch (action.type) {
        case "ZERO":
            if (state.input.match(/[+]|[-]|[*]|[/]/)) {
                nstate.output += state.input;
                nstate.input = "";
                nstate.input += "0";
            } else if (state.input.startsWith("0")) {
            }
            else {
                nstate.input += "0";
            }
            return nstate
        case "ONE":
            if (state.input.match(/[+]|[-]|[*]|[/]/)) {
                nstate.output += state.input;
                nstate.input = "";
                nstate.input += "1";
            } else {
                nstate.input += "1";
            }
            return nstate
        case "TWO":
            if (state.input.match(/[+]|[-]|[*]|[/]/)) {
                nstate.output += state.input;
                nstate.input = "";
                nstate.input += "2";
            } else {
                nstate.input += "2";
            }
            return nstate
        case "THREE":
            if (state.input.match(/[+]|[-]|[*]|[/]/)) {
                nstate.output += state.input;
                nstate.input = "";
                nstate.input += "3";
            } else {
                nstate.input += "3";
            }
            return nstate
        case "FOUR":
            if (state.input.match(/[+]|[-]|[*]|[/]/)) {
                nstate.output += state.input;
                nstate.input = "";
                nstate.input += "4";
            } else {
                nstate.input += "4";
            }
            return nstate
        case "FIVE":
            if (state.input.match(/[+]|[-]|[*]|[/]/)) {
                nstate.output += state.input;
                nstate.input = "";
                nstate.input += "5";
            } else {
                nstate.input += "5";
            }
            return nstate
        case "SIX":
            if (state.input.match(/[+]|[-]|[*]|[/]/)) {
                nstate.output += state.input;
                nstate.input = "";
                nstate.input += "6";
            } else {
                nstate.input += "6";
            }
            return nstate
        case "SEVEN":
            if (state.input.match(/[+]|[-]|[*]|[/]/)) {
                nstate.output += state.input;
                nstate.input = "";
                nstate.input += "7";
            } else {
                nstate.input += "7";
            }
            return nstate
        case "EIGHT":
            if (state.input.match(/[+]|[-]|[*]|[/]/)) {
                nstate.output += state.input;
                nstate.input = "";
                nstate.input += "8";
            } else {
                nstate.input += "8";
            }
            return nstate
        case "NINE":
            if (state.input.match(/[+]|[-]|[*]|[/]/)) {
                nstate.output += state.input;
                nstate.input = "";
                nstate.input += "9";
            } else {
                nstate.input += "9";
            }
            return nstate
        case "DECIMAL":
            if (state.input.includes(".")) {
            } else {
                nstate.input += ".";
            }
            return nstate;
        case "ADD":
            if (state.output.endsWith("+") && state.input === "") {
            } else if (state.input.match(/[+]|[*]|[/]/)) {
                nstate.input = "+";
            }
            else {
                nstate.output += state.input;
                nstate.input = "+";
            };
            return nstate
        case "SUBTRACT":
            if (state.output.endsWith("-") && state.input === "") {
            } else if (state.input.match(/[-]/)) {
                nstate.input = "-";
            }
            else {
                nstate.output += state.input;
                nstate.input = "-";
            };
            return nstate;
        case "MULTIPLY":
            if (state.output.endsWith("*") && state.input === "") {
            } else if (state.input.match(/[+]|[*]|[/]/)) {
                nstate.input = "*";
            }
            else {
                nstate.output += state.input;
                nstate.input = "*";
            };
            return nstate
        case "DIVIDE":
            if (state.output.endsWith("/") && state.input === "") {
            } else if (state.input.match(/[+]|[*]|[/]/)) {
                nstate.input = "/";
            }
            else {
                nstate.output += state.input;
                nstate.input = "/";
            };
            return nstate
        case "CLEAR":
            nstate.output = "0";
            nstate.input = "0";
            return nstate
        case "EQUALS":
            if (nstate.output.match(/^[*]|^[/]/)) {
                nstate.output = "0" + nstate.output;
            }
            
            nstate.output += state.input;
            let stateHolder = nstate.output;
            if (stateHolder.split(/(?:[*]|[/]|[+]|[-])[-](?:[*]|[/]|[+])/g).join("") === nstate.output) {
            } else {
                stateHolder = nstate.output;
                let index = stateHolder.search(/(?:[*]|[/]|[+]|[-])[-](?:[*]|[/]|[+])/g) + 2;
                let fullState = stateHolder.slice(0, index - 2) + stateHolder.slice(index);
                nstate.output = fullState;
            }
            evaluation = eval(nstate.output);
            nstate.output += "=" + evaluation
            nstate.input = evaluation.toString();
            nstate.newEquation = true;
            return nstate;
        default:
            return state;
    }
}
let store = createStore(numberReducer);
const mapStateToProps = (state) => {
    const { input, output } = state;
    return {
        input: input,
        output: output,
        newEquation: false
    };
}
const Container = connect(mapStateToProps)(App);
root.render(
    <Provider store={store}>
    <Container />
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
