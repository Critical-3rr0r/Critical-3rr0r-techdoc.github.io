export const initialState = {
    session: "session-stop",
    sessionTime: 1500000,
    sessionTimeStore: 1500000,
    breakTime: 300000,
    breakTimeStore: 300000
}
const reducer = (state = initialState, action) => {
    let nstate = { ...state };

    switch (action.type) {
        case "BREAK+":
            if (nstate.session === "session-play") {
                nstate.session = "session-stop";
            } else if (nstate.session === "break-play") {
                nstate.session = "break-stop"
            }
            if (nstate.breakTime < 3600000) {
                nstate.breakTimeStore = nstate.breakTime;
                nstate.breakTime += 60000;
                nstate.breakTimeStore += 60000;
            }
            return nstate;
        case "BREAK-":
            if (nstate.session === "session-play") {
                nstate.session = "session-stop";
            } else if (nstate.session === "break-play") {
                nstate.session = "break-stop"
            }
            if (nstate.breakTime > 60000) {
                nstate.breakTimeStore = nstate.breakTime;
                nstate.breakTime -= 60000;
                nstate.breakTimeStore -= 60000;
                if (nstate.breakTimeStore < 60000) {
                    nstate.breakTimeStore = 60000;
                }
            }
            return nstate;
        case "SESS+":
            if (nstate.session === "session-play") {
                nstate.session = "session-stop";
            } else if (nstate.session === "break-play") {
                nstate.session = "break-stop"
            }
            if (nstate.sessionTime < 3600000) {
                nstate.sessionTimeStore = nstate.sessionTime;
                nstate.sessionTime += 60000;
                nstate.sessionTimeStore += 60000;
            }
            return nstate;
        case "SESS-":
            if (nstate.session === "session-play") {
                nstate.session = "session-stop";
            } else if (nstate.session === "break-play") {
                nstate.session = "break-stop"
            }
            if (nstate.sessionTime > 60000) {
                nstate.sessionTimeStore = nstate.sessionTime;
                nstate.sessionTime -= 60000;
                nstate.sessionTimeStore -= 60000;
                if (nstate.sessionTimeStore < 60000) {
                    nstate.sessionTimeStore = 60000;
                }
            }
            return nstate;
        case "PLAY":
            if (nstate.session === "session-stop") {
                nstate.session = "session-play";
            } else {
                nstate.session = "break-play";
            }
            return nstate;
        case "PAUSE":
            if (nstate.session === "session-play") {
                nstate.session = "session-stop";
            } else {
                nstate.session = "break-stop";
            }
            return nstate;
        case "RESET":
            nstate = initialState;
            return nstate;
        case "RUNNING":
            if (nstate.session === "session-play") {
                nstate.sessionTime -= 1000;
            } else if (nstate.session === "break-play") {
                nstate.breakTime -= 1000;
            }
            if (nstate.sessionTime === -1000) {
                nstate.session = "break-play";
                nstate.sessionTime = nstate.sessionTimeStore;
            } else if (nstate.breakTime === -1000) {
                nstate.session = "session-play";
                nstate.breakTime = nstate.breakTimeStore;
            }
            return nstate;
        case "CHANGE":
            if (nstate.session === "session-stop") {
                nstate.session = "break-play";
                nstate.sessionTime = nstate.sessionTimeStore;
            } else {
                nstate.session = "session-play";
                nstate.breakTime = nstate.breakTimeStore;
            }
            return nstate;
        default:
            return nstate;
    }
}
export default reducer;