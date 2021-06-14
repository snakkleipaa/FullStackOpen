const notification = ''
var previousId = ''

const notificationReducer = (state = notification, action) => {
    switch(action.type) {
        case 'NEW_NOTIFICATION': 
            return action.data
        default:
            return state
    }
}

export const setNotification = (message, time) => {
    return async dispatch => {
        dispatch({
            type: 'NEW_NOTIFICATION',
            data: message
        })
        clearTimeout(previousId)
        previousId = setTimeout(() => {
            dispatch({
                type: 'NEW_NOTIFICATION',
                data: ''
            })
        }, (time * 1000));
    }
}

export default notificationReducer