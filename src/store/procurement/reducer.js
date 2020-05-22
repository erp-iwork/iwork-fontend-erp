import { purchaseConstants, errorsConstant } from '../../constant/constants'
const initialState = {
    errors: { purchaseOrder: {
        suplier: [], orderdBy: [], purchase_item_order: [] 
    }},
    orders: [],
    suppliers: [],
    masterdata: [],
    loading_purchase: false,
    loading_orders: false,
    loading_suppliers: false,
    loading_masterdata: false,
    success: false
}

const procurementReducer = (state = initialState, action) => {
    const { GET, POST } = purchaseConstants
    switch(action.type) {
        case errorsConstant.GET_ERRORS:
            return {
                ...state,
                errors: action.payload,
                loading_orders: false, loading_suppliers: false, loading_masterdata: false,
                loading_purchase: false
            }
        
        case GET.REQUEST_GET_ORDER:
            return { ...state, loading_orders: true }
        case GET.REQUEST_GET_SUPPLIERS:
            return { ...state, loading_suppliers: true }
        case GET.REQUEST_GET_MASTERDATA:
            return { ...state, loading_suppliers: true }
        
        case GET.SUCCESS_GET_ORDER:
            return { 
                ...state, loading_orders: false,
                orders: action.payload
            }
        case GET.SUCCESS_GET_SUPPLIERS:
            return {
                ...state, loading_suppliers: false,
                suppliers: action.payload
            }
        case GET.SUCCESS_GET_MASTERDATA:
            return {
                ...state, loading_masterdata: false,
                masterdata: action.payload
            }
        
        case POST.REQUEST_POST_PURCHASE:
            return {
                ...state, loading_purchase: true
            }
        case POST.SUCCESS_POST_PURCHASE:
            return {
                ...state,
                loading_purchase: false,
                success: true,
                orders: [ ...state.orders, action.payload.purchaseOrder]
            }
        
        default:
            return { ...state }
    }
}

export default procurementReducer