import { companyConstant, errorsConstant } from "../../constant/constants";
const initialState = {
  companys: [],
  suppliers: [],
  loading: false,
  masterData: [],
  success: false,
  errors: []
};

export default function companyReducer(state = initialState, action) {
  switch (action.type) {
    case errorsConstant.GET_ERRORS:
      return {
        ...state,
        errors: action.payload,
        success: false,
        loading: false,
      }
    
    case companyConstant.REQUEST_GET_COMANY:
      return {
        ...state,
        loading: action.payload
      }

    case companyConstant.GET_COMPANYS:
      return {
        ...state,
        companys: action.payload,
        loading: false,
      };
    case companyConstant.ADD_COMPANY:
      return {
        ...state,
        companys: [...state.companys, action.payload],
        success: true,
        errors: [],
      };
    
    case companyConstant.REQUEST_GET_SUPPLIER:
      return {
        ...state,
        loading: action.payload
      }

    case companyConstant.GET_SUPPLIER:
      return {
        ...state,
        suppliers: action.payload,
        loading: false
      }

    case companyConstant.ADD_SUPPLIER:
      return {
        ...state,
        suppliers: [...state.suppliers, action.payload],
        success: true,
        errors: []
      };

    case companyConstant.DELETE_COMPANY:
      return {
        ...state,
        companys: state.companys.filter(
          (company) => company.companyId !== action.payload
        ),
        loading: false,
      };
  
    case companyConstant.REQUEST_ADD_MASTERDATA:
      return {
        ...state,
        loading: action.payload,
      }

    case companyConstant.ADD_MASTERDATA:
      return {
        ...state,
        loading: false,
        success: true
      }

    case companyConstant.REQUEST_GET_MASTERDATA:
      return {
        ...state,
        loading: action.payload
      }
    
    case companyConstant.GET_MASTERDATA:
      return {
        ...state,
        loading: false,
        masterData: action.payload
      }

    default:
      return state;
  }
}
