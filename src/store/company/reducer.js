import { companyConstant, errorsConstant } from "../../constant/constants";
const initialState = {
  companys: [],
  suppliers: [],
  orders: [],
  errors: [],

  masterData: [],
  loading: false,
  loading_addMasterdata: false,
  success: false,
  updating_status: false,
  loading_add_supplier: false,
  loading_add_customer: false,
  loading_manufactured_orders: true
}

export default function companyReducer(state = initialState, action) {
  switch (action.type) {
    case errorsConstant.GET_ERRORS:



      return {
        ...state,
        errors: action.payload,
        success: false,
        loading: false,
        loading_addMasterdata: false,
        loading_add_supplier: false,
        loading_add_customer: false
      }

    case companyConstant.REQUEST_GET_COMANY:
      return {
        ...state,
        loading_add_customer: true,
        errors: [],
      }

    case companyConstant.ADD_COMPANY:
      return {
        ...state,
        companys: [...state.companys, action.payload],
        success: true,
        loading_add_customer: false,
        errors: [],
      };

    case companyConstant.GET_COMPANYS:
      return {
        ...state,
        companys: action.payload,
        loading: false,
        errors: [],
      };


    case companyConstant.REQUEST_GET_SUPPLIER:
      return {
        ...state,
        loading: true,
        errors: [],
      }

    case companyConstant.GET_SUPPLIER:
      return {
        ...state,
        suppliers: action.payload,
        loading: false,
        errors: [],
      }

    // Updated Add Supplier
    case companyConstant.REQUEST_POST_ADD_SUPPLIER:
      return {
        ...state, loading_add_supplier: true, errors: [],
      }

    case companyConstant.SUCCESS_POST_ADD_SUPPLIER:
      return {
        ...state, loading_add_supplier: false, success: true,
        suppliers: [...state.suppliers, action.payload],
        errors: []
      }

    case companyConstant.DELETE_COMPANY:
      return {
        ...state,
        companys: state.companys.filter(
          (company) => company.companyId !== action.payload
        ),
        loading: false,
        errors: [],
      };

    case companyConstant.REQUEST_ADD_MASTERDATA:
      return {
        ...state,
        loading_addMasterdata: true, errors: [],
      }

    case companyConstant.ADD_MASTERDATA:
      return {
        ...state,
        loading_addMasterdata: false,
        success: true,
        errors: [],
      }

    case companyConstant.REQUEST_GET_MASTERDATA:
      return {
        ...state,
        loading: action.payload,
        errors: [],
      }

    case companyConstant.GET_MASTERDATA:
      return {
        ...state,
        loading: false,
        masterData: action.payload,
        errors: [],
      }

    case companyConstant.REQUEST_UPDATE_STATUS:
      return {
        ...state,
        updating_status: true
      }
    case companyConstant.SUCCESS_UPDATE_STATUS:
      return {
        ...state, updating_status: false,
        success: true,
        errors: [],
      }

    case companyConstant.REQUEST_GET_MANUFACTURED_ORDERS:
      return {
        ...state,
        loading_manufactured_orders: true,
        errors: [],
      }
    case companyConstant.SUCCESS_GET_MANUFACTURED_ORDERS:
      return {
        ...state,
        loading_manufactured_orders: false,
        orders: action.payload,
        errors: [],
      }

    case companyConstant.REQUEST_DELETE_MASTERDATA: {
      return {
        ...state, loading_manufactured_orders: true
      }
    }

    case companyConstant.SUCCESS_DELETE_MASTERDATA: {
      const index = state.masterData.findIndex(item => item.id === action.payload)
      var data = state.masterData
      if (index !== -1) {
        data.splice(index, 1)
      }
      return {
        ...state, masterData: data, loading_manufactured_orders: false
      }
    }

    default:
      return state;
  }
}
