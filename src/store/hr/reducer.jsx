import { appConstants } from "../../constant/constants";
const initialState = {
  loading: false,
  success: false,
  delete_empoyee_loading: false,
  fetch_employee_loading: false,
  fetch_department_loading: false,
  post_employee_loading: false,
  fetch_single_employee_loading: false,

  delete_empoyee_success: false,
  fetch_employee_success: false,
  fetch_department_success: false,
  post_employee_success: false,
  fetch_single_employee_success: false,

  errors: [],
  employees: [],
  employee: [],
  department: [],
};
export default function hrReducer(state = initialState, action) {
  switch (action.type) {
    // All employe api pre-request
    case appConstants.REGISTER_REQUEST: {
      return {
        ...state,
        errors: [],
        loading: true,
        post_employee_loading: true,
        delete_empoyee_success: false,
        fetch_employee_success: false,
        fetch_department_success: false,
        post_employee_success: false,
        fetch_single_employee_success: false,
      };
    }

    case appConstants.FETCH_REQUEST: {
      return {
        ...state,
        errors: [],
        loading: true,
        fetch_employee_loading: true,
        delete_empoyee_success: false,
        fetch_employee_success: false,
        fetch_department_success: false,
        post_employee_success: false,
        fetch_single_employee_success: false,
      };
    }
    case appConstants.DELETE_REQUEST: {
      return {
        ...state,
        errors: [],
        loading: true,
        delete_empoyee_loading: true,
        delete_empoyee_success: false,
        fetch_employee_success: false,
        fetch_department_success: false,
        post_employee_success: false,
        fetch_single_employee_success: false,
      };
    }
    case appConstants.FETCH_SINGLE_REQUEST: {
      return {
        ...state,
        errors: [],
        fetch_single_employee_loading: true,
        delete_empoyee_success: false,
        fetch_employee_success: false,
        fetch_department_success: false,
        post_employee_success: false,
        fetch_single_employee_success: false,
      };
    }
    case appConstants.FETCH_DEPARTMENT_REQUEST: {
      return {
        ...state,
        errors: [],
        loading: true,
        fetch_department_loading: true,
        delete_empoyee_success: false,
        fetch_employee_success: false,
        fetch_department_success: false,
        post_employee_success: false,
        fetch_single_employee_success: false,
      };
    }

    // All employe api call failure
    case appConstants.REGISTER_FAILURE: {
      return {
        ...state,
        errors: action.payload.errors,
        loading: true,
        post_employee_loading: false,
        post_employee_success: false,
        success: false,
      };
    }

    case appConstants.FETCH_FAILURE: {
      return {
        ...state,
        errors: [],
        loading: true,
        fetch_employee_loading: false,
        fetch_employee_success: false,
        success: false,
      };
    }
    case appConstants.DELETE_FAILURE: {
      return {
        ...state,
        errors: [],
        loading: true,
        delete_empoyee_loading: false,
        delete_empoyee_success: false,
        success: false,
      };
    }
    case appConstants.FETCH_SINGLE_FAILURE: {
      return {
        ...state,
        errors: [],
        loading: true,
        fetch_single_employee_loading: false,
        fetch_single_employee_success: false,
      };
    }
    case appConstants.FETCH_DEPARTMENT_FAILURE: {
      return {
        ...state,
        errors: [],
        loading: true,
        fetch_department_loading: false,
        fetch_department_success: false,
        success: false,
      };
    }

    // All employe api call success results
    case appConstants.REGISTER_SUCCESS: {
      return {
        ...state,
        errors: [],
        loading: false,
        post_employee_loading: false,
        post_employee_success: true,
        isLogin: true,
        employees: [action.payload.employe, ...state.employees],
      };
    }

    case appConstants.FETCH_SUCCESS: {
      return {
        ...state,
        employees: action.payload,
        errors: [],
        loading: false,
        success: true,
        fetch_employee_loading: false,
        fetch_employee_success: true,
      };
    }

    case appConstants.FETCH_SINGLE_SUCCESS: {
      return {
        ...state,
        employee: action.payload,
        errors: [],
        loading: false,
        isLogin: true,
        success: true,
        fetch_single_employee_loading: false,
        fetch_single_employee_success: true,
      };
    }

    case appConstants.FETCH_DEPARTMENT_SUCCESS: {
      return {
        ...state,
        department: action.payload,
        errors: [],
        loading: false,
        isLogin: true,
        success: true,
        fetch_department_success: true,
        fetch_department_loading: false,
      };
    }

    case appConstants.DELETE_SUCCESS: {
      return {
        ...state,
        employees: state.employees.filter(
          (emp) => emp.employeId !== action.payload
        ),
        errors: [],
        loading: false,
        isLogin: true,
        success: true,
        delete_empoyee_loading: false,
        delete_empoyee_success: true,
      };
    }

    default:
      // ALWAYS have a default case in a reducer
      return state;
  }
}
