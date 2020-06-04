import { manuFacturingConstant, errorsConstant } from '../../constant/constants'

const initialState = {
    errors: [],
    masterdata: [],
    orders: [],
    order: [],
    loading_masterdata: true,
    loading_manufacture: false,
    loading_orders: true,
    loading_single_order: true,
    loading_manufactured_orders: true,
    loading_invoice: false,
    success: false,
}

const manuFacturingReducer = (state = initialState, action) => {
    switch (action.type) {
        case errorsConstant.GET_ERRORS:
            return {
                ...state, success: false, loading_manufacture: false,
                errors: action.payload, loading_invoice: false
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
        case manuFacturingConstant.REQUEST_PUT_ORDERS:
            return { ...state, loading_manufacture: true }

        case manuFacturingConstant.SUCCESS_PUT_ORDERS:
            const index = state.orders.findIndex(
                (emp) => emp.orderNumber === action.payload.order
            );
            state.orders[index].status_manufacture_order[0].status = action.payload.status;

            return {
                ...state, loading_manufacture: false,
                success: true,
                orders: state.orders
            }
        case manuFacturingConstant.REQUEST_GET_ORDERS:
            return { ...state, loading_orders: true }
        case manuFacturingConstant.SUCCESS_GET_ORDERS:
            return {
                ...state, loading_orders: false,
                orders: action.payload
            }

        case manuFacturingConstant.REQUEST_GET_SINGLE_ORDER:
            return { ...state, loading_single_order: true }
        case manuFacturingConstant.SUCCESS_GET_SINGLE_ORDER:
            return {
                ...state, loading_single_order: false,
                order: action.payload
            }

        case manuFacturingConstant.REQUEST_PUT_INVOICE_ORDER:
            return { ...state, loading_invoice: true }
        case manuFacturingConstant.SUCCESS_PUT_INVOICE_ORDER:
            return { ...state, loading_invoice: false, success: true }
        
        case manuFacturingConstant.REQUEST_GET_MANUFACTURED_ORDERS:
            return { ...state, loading_manufactured_orders: true }
        case manuFacturingConstant.SUCCESS_GET_MANUFACTURED_ORDERS:
            return {
                ...state, loading_manufactured_orders: false,
                orders: action.payload
            }

        default: return state
    }
}

export default manuFacturingReducer