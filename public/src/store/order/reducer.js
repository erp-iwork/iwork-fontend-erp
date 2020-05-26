import {
  GET_ORDER, UPDATE_ORDER, GET_SINGLE_ORDER, GET_STATUS, UPDATE_STATUS,
  REQUEST_ORDERS, REQUEST_SINGLE_ORDER, orderConstants, errorsConstant
} from "../../constant/constants";
const initialState = {
  orders: [],
  status: {},
  order: [],
  items: [],
  success: false,
  loading: true,
  loading_single_order: true
};

const { GET } = orderConstants

export default function ordersReducer(state = initialState, action) {
  switch (action.type) {
    case errorsConstant.GET_ERRORS:
      return {
        ...state,
        errors: action.payload,
      };
    
    case REQUEST_ORDERS:
      return {
        loading: action.payload
      }
    
    case REQUEST_SINGLE_ORDER:
      return {
        loading_single_order: true
      }
    
    case GET_SINGLE_ORDER:
      return {
        ...state,
        order: action.payload,
        items: action.payload.item_order ? action.payload.item_order : [],
        loading_single_order: false
      };
    case GET_ORDER: {
      return {
        ...state,
        orders: action.payload,
        loading: false
      };
    }

    case UPDATE_ORDER: {
      return {
        ...state,
        orders: state.orders,
      };
    }
    case GET_STATUS:
      return {
        ...state,
        status: action.payload,
      };
    case UPDATE_STATUS: {
      const index = state.orders.findIndex(
        (item) => item.orderNumber === action.payload.order
      );
      state.orders[index].status = action.payload.status;
      return {
        ...state,
        success: true,
        orders: state.orders,
        order: state.order,
        status: action.payload,
      };
    }
    case GET['REQUEST_GET_DELIVERED_ORDERS']:
      return { ...state, loading: true }
    case GET['SUCCESS_GET_DELIVERED_ORDERS']:
      return {
        ...state, loading: false,
        orders: action.payload
      }

    default:
      return state;
  }
}
