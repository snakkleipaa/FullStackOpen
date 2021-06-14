const initialFilter = ''

export const setFilter = (filter) => {
    return {
        type: 'NEW_FILTER',
        filter
    }
}

const filterReducer = (state=initialFilter, action) => {
    switch(action.type) {
        case 'NEW_FILTER': 
            return action.filter
        default: 
            return state
    }
}

export default filterReducer