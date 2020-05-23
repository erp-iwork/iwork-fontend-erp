import { manuFacturingConstant, errorsConstant } from '../../constant/constants'

const initialState = {
    errors: [],
    masterdata: [],
    loading_masterdata: true,
    success: false,
}

const manuFacturingReducer = (state = initialState, action) => {
    switch(action.type) {
        case manuFacturingConstant.REQUEST_GET_MASTERDATA:
            return {
                ...state, loading_masterdata: true
            }
        
        case manuFacturingConstant.SUCCESS_GET_MASTERDATA:
            return {
                ...state, loading_masterdata: false,
                masterdata: action.payload
            }

        default: return state
    }
}

export default manuFacturingReducer