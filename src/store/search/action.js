import constants from './constants'

export const updateSearch = searchValue => dispatch => {
    dispatch({ type: constants.UPDATE_SEARCH_VALUE, payload: searchValue })
}

export const updateFilter = (key, value) => dispatch => {
    dispatch({ type: constants.UPDATE_FILTER_VALUE, payload: { key, value } })
}