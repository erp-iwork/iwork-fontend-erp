import { manuFacturingConstant, errorsConstant } from '../../constant/constants'

const initialState = {
    errors: [],
    masterdata: [],
    orders: [],
    loading_masterdata: true,
    loading_manufacture: false,
    loading_orders: true,
    success: false,
}

const manuFacturingReducer = (state = initialState, action) => {
    switch(action.type) {
        case errorsConstant.GET_ERRORS:
            return {
                ...state, success: false, loading_manufacture: false,
                errors: action.payload,
            }
        case manuFacturingConstant.REQUEST_GET_MASTERDATA:
            return {
                ...state, loading_masterdata: true
            }
        
        case manuFacturingConstant.SUCCESS_GET_MASTERDATA:
            return {
                ...state, loading_masterdata: false,
                masterdata: action.payload
            }
        
        case manuFacturingConstant.REQUEST_POST_MANUFATURE:
            return { ...state, loading_manufacture: true }
        case manuFacturingConstant.SUCCESS_POST_MANUFATURE:
            return {
                ...state, loading_manufacture: false,
                success: true
            }

        case manuFacturingConstant.REQUEST_GET_ORDERS:
            return { ...state, loading_orders: true }
        case manuFacturingConstant.SUCCESS_GET_ORDERS:
            return {
                ...state, loading_orders: false,
                orders: action.payload
            }

        default: return state
    }
}

export default manuFacturingReducer