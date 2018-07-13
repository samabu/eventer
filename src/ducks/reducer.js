const UPDATE_USER_DATA = "UPDATE_USER_DATA";
const USER_DATA = "USER_DATA";
const GET_FRIENDS = "GET_FRIENDS";
const GET_EVENT_ID = "GET_EVENT_ID";

const initialState = {
    user: {},
    friends: [],
    eventID: 0
}

export function getUserData(user) {
    return {
        type: USER_DATA,
        payload: user
    }
}

export function updateUserData(user) {
    return {
        type: UPDATE_USER_DATA,
        payload: user
    }
}

export function getFriends(friends) {
    return {
        type: GET_FRIENDS,
        payload: friends
    }
}

export function getEventID(eventID) {
    return {
        type: GET_EVENT_ID,
        payload: eventID
    }
}


export default function reducer(state=initialState, action) {
    switch (action.type) {
        case USER_DATA:
            return Object.assign({}, state, { user: action.payload });
        case UPDATE_USER_DATA:
            return Object.assign({}, state, { user: action.payload });
        case GET_FRIENDS:
            return Object.assign({}, state, { friends: action.payload });
        case GET_EVENT_ID:
            return Object.assign({}, state, { friends: action.payload });
        default:
            return state;
    }
}