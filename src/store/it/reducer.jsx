import { itConstants } from "../../constant/constants";
const initialState = {
  users: [],
  isLogin: false,
  errors: [],
  delete_user_loading: false,
  post_user_loading: false,
  get_user_loading: false,

  delete_user_success: false,
  post_user_success: false,
  get_user_success: false,
};
export default function itReducer(state = initialState, action) {
  switch (action.type) {
    // All employe api pre-request
    case itConstants.REGISTER_REQUEST: {
      return {
        ...state,
        errors: [],
        post_user_loading: true,
        delete_user_success: false,
        post_user_success: false,
        get_user_success: false,
      };
    }
    case itConstants.GETALL_REQUEST: {
      return {
        ...state,
        errors: [],
        get_user_loading: true,
        delete_user_success: false,
        post_user_success: false,
        get_user_success: false,
      };
    }
    case itConstants.DELETE_REQUEST: {
      return {
        ...state,
        errors: [],
        loading: true,
        delete_user_loading: true,
        delete_user_success: false,
        post_user_success: false,
        get_user_success: false,
      };
    }

    // All employe api call failure
    case itConstants.REGISTER_FAILURE: {
      return {
        ...state,
        errors: action.payload.errors,
        post_user_success: false,
        post_user_loading: false,
      };
    }

    case itConstants.DELETE_FAILURE: {
      return {
        ...state,
        delete_user_success: false,
        delete_user_loading: false,
      };
    }

    case itConstants.GETALL_FAILURE: {
      return {
        ...state,
        delete_user_success: false,
        delete_user_loading: false,
      };
    }

    // All It api call success

    case itConstants.REGISTER_SUCCESS: {
      console.log(action.payload);
      const index = state.users.findIndex(
        (emp) => emp.email === action.payload
      );
      const user = state.users[index];
      user.has_account = true;

      return {
        ...state,
        users: state.users,
        errors: [],
        post_user_loading: false,
        post_user_success: true,
      };
    }
    case itConstants.GETALL_SUCCESS: {
      return {
        ...state,
        users: action.payload,
        errors: [],
        get_user_loading: false,
        get_user_success: true,
      };
    }
    case itConstants.DELETE_SUCCESS: {
      const index = state.users.findIndex(
        (emp) => emp.email === action.payload
      );
      state.users[index].has_account = false;

      return {
        ...state,
        employees: state.users,
        errors: [],
        delete_user_success: true,
        delete_user_loading: false,
      };
    }

    default:
      // ALWAYS have a default case in a reducer
      return state;
  }
}
