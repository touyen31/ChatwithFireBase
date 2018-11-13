

const init = {
    send: null,
    receive: null
}

const chatReducer = (state = init, action) => {
    switch (action.type) {
        case 'ADD_SENDER_RECEIVER':
            return {send: action.sender, receive: action.receiver};
        default:
            return state;
    }
}

export  default chatReducer