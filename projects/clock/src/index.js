import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from "react-redux";
import { connect } from "react-redux";
import { useDispatch } from "react-redux";
import { createStore } from "redux";
import reducer from "./reducer";
let store = createStore(reducer);
const mapStateToProps = (state) => {
    const { session, sessionTime, breakTime, sessionTimeStore, breakTimeStore } = state;
    console.log(session, "session", sessionTime, "sessionTime", breakTime, "breakTime");
    return {
        session: session,
        sessionTime: sessionTime,
        breakTime: breakTime,
        sessionTimeStore: sessionTimeStore,
        breakTimeStore: breakTimeStore
    }
}
const Container = connect(mapStateToProps)(App);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <Container />
    </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
