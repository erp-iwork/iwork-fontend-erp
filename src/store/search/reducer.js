import constants from './constants'

const initalState = {
    value: "",
    filter: {

    }
}

const searchData = (state = initalState, action) => {
    switch(action.type) {
        case constants.UPDATE_SEARCH_VALUE: {
            return {
                ...state, value: action.payload
            }
        }

        case constants.UPDATE_FILTER_VALUE: {
            return {
                ...state, filter: {
                    ...state.filter,
                    [action.payload.key]: action.payload.value
                }
            }
        }

        default: return state
    }
}

export default searchData