import { purchaseConstants, errorsConstant } from '../../constant/constants'
const initialState = {
    errors: { purchaseOrder: {
        suplier: [], orderdBy: [], purchase_item_order: [] 
    }},
    orders: [],
    order: {},
    suppliers: [],
    masterdata: [],
    loading_purchase: false,
    loading_orders: false,
    loading_suppliers: false,
    loading_masterdata: false,
    loading_single_order: true,
    success: false,
    updating_status: false,
    loading_invoice: false,
}

const procurementReducer = (state = initialState, action) => {
    const { GET, POST, PUT } = purchaseConstants
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
        case GET.REQUEST_GET_SINGLE_ORDER:
            return { ...state, loading_single_order: true } 
        
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
        case GET.SUCCESS_GET_SINGLE_ORDER:
            return {
                ...state, loading_single_order: false,
                order: action.payload
            }
        
        case POST.REQUEST_POST_PURCHASE:
            return {
                ...state, loading_purchase: true,
                loading_orders: false, loading_masterdata: false, loading_suppliers: false
            }
        case POST.SUCCESS_POST_PURCHASE:
            return {
                ...state,
                loading_purchase: false,
                success: true,
                orders: [ ...state.orders, action.payload.purchaseOrder]
            }
        
        case PUT.REQUEST_POST_UPDATE_STATUS:
            return { ...state, updating_status: true }
        
        case PUT.SUCCESS_POST_UPDATE_STATUS:
            const index = state.orders.findIndex(
                (item) => item.purchaseOrderNumber === action.payload.order
              )
              state.orders[index].status_purchase_order[0]['status'] = action.payload.status
            return {
                ...state,
                success: true,
                orders: state.orders,
                order: state.order,
                status: action.payload,
            }

        case PUT.REQUEST_PUT_INVOICE:
            return {
                ...state, loading_invoice: true
            }

        case PUT.SUCCESS_PUT_INVOICE:{
            return {
                ...state, loading_invoice: false,
                success: true
            }
        }

        default:
            return { ...state }
    }
}

export default procurementReducer