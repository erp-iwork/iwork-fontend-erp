import constants from './constants'

export const updateSearch = searchValue => dispatch => {
    dispatch({ type: constants.UPDATE_SEARCH_VALUE, payload: searchValue })
}