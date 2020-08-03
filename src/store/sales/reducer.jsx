import { salesConstants, errorsConstant } from "../../constant/constants";
const initialState = {
  loading: false,
  isLogin: false,
  success: false,
  errors: [],
  orders: [],
  companys: [],
  items: [],
  loading_orders: true,
  loading_companies: true,
  loading_items: true,
};
export default function salesReducer(state = initialState, action) {
  switch (action.type) {
    case errorsConstant.GET_ERRORS:
      return {
        ...state,
        errors: action.payload,
        success: false,
      };
    case salesConstants.ORDER_REQUEST: {
      return {
        ...state,
        loading: true,
        loading_orders: true
      };
    }
    case salesConstants.ORDER_GETALL_SUCCESS: {
      return {
        ...state,
        orders: action.payload,
        loading_orders: false,
        loading: false,
        isLogin: true,
        success: false,
      };
    }
    case salesConstants.ORDER_GETALL_FAILURE: {
      return {
        ...state,
        errors: action.payload,
        loading: false,
        isLogin: false,
        success: false,
      };
    }
    case salesConstants.ORDER_SUCCESS: {
      return {
        ...state,
        errors: [],
        items: [...state.items, action.payload],
        loading_orders: false,
        loading: false,
        isLogin: true,
        success: true,
      };
    }
    case salesConstants.ORDER_FAILURE: {
      return {
        ...state,
        errors: action.payload,
        loading: false,
        isLogin: false,
        success: false,
      };
    }

    case salesConstants.ITEM_GETALL_REQUEST: {
      return {
        ...state,
        loading: true,
        loading_items: true,
      };
    }
    case salesConstants.ITEM_GETALL_SUCCESS: {
      return {
        ...state,
        items: action.payload,
        loading: false,
        isLogin: true,
        success: false,
        loading_items: false,
      };
    }
    case salesConstants.ITEM_GETALL_FAILURE: {
      return {
        ...state,
        errors: action.payload,
        loading: false,
        isLogin: false,
        success: false,
      };
    }

    case salesConstants.COMPANY_GETALL_REQUEST: {
      return {
        ...state,
        loading: true,
        loading_companies: true
      };
    }
    case salesConstants.COMPANY_GETALL_SUCCESS: {
      return {
        ...state,
        companys: action.payload,
        loading: false,
        isLogin: true,
        success: false,
        loading_companies: false
      };
    }
    case salesConstants.COMPANY_GETALL_FAILURE: {
      return {
        ...state,
        errors: action.payload,
        loading: false,
        isLogin: false,
        success: false,
      };
    }
    default:
      // ALWAYS have a default case in a reducer
      return state;
  }
}
