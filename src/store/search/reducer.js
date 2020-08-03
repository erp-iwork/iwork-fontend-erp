import constants from './constants'

const initalState = {
    value: ""
}

const searchData = (state = initalState, action) => {
    switch(action.type) {
        case constants.UPDATE_SEARCH_VALUE: {
            return {
                ...state, value: action.payload
            }
        }

        default: return state
    }
}

export default searchData