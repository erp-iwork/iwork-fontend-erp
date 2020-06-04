import Swal from "sweetalert2";
import axios from "axios";
import API from "../../api/API";
import { itConstants } from "../../constant/constants";
import headers from "./../headers";
function deleteAccount(email) {
  return (dispatch) => {
    dispatch({
      type: itConstants.DELETE_REQUEST,
      payload: true,
    });
    axios
      .request({
        method: "DELETE",
        url: API + "account",
        responseType: "json",
        headers: headers,
        data: {
          email: email,
        },
      })
      .then((response) => {
        dispatch({
          type: itConstants.DELETE_SUCCESS,
          payload: email,
        });
      })

      .catch((error) => {
        if (error.response && error.response.data) {
          dispatch({
            type: itConstants.DELETE_FAILURE,
            payload: error.response.data.errors,
          });
        } else {
          Swal.fire({
            title: "Error",
            text: "Connection Problem",
            icon: "error",
            showConfirmButton: false,
            timer: 1000,
          });
        }
      });
  };
}

function addAccount(employe) {
  return (dispatch) => {
    dispatch({
      type: itConstants.REGISTER_REQUEST,
      payload: true,
    });
    axios
      .request({
        method: "POST",
        url: API + "account/",
        responseType: "json",
        headers: headers,
        data: {
          username: employe.username,
          password: employe.password,
          email: employe.email,
          employe: employe.employe,
          department: employe.department,
          roles: employe.role,
          claim: employe.claim,
          is_admin: employe.is_admin,
        },
      })
      .then((response) => {
        dispatch({
          type: itConstants.REGISTER_SUCCESS,
          payload: response.data.email,
        });
      })
      .catch((error) => {
        if (error.response && error.response.data) {
          dispatch({
            type: itConstants.REGISTER_FAILURE,
            payload: error.response.data,
          });
        } else {
          Swal.fire({
            title: "Error",
            text: "Connection Problem",
            icon: "error",
            showConfirmButton: false,
            timer: 1000,
          });
        }
      });
  };
}

function getUsers() {
  return (dispatch) => {
    dispatch({
      type: itConstants.GETALL_REQUEST,
      payload: true,
    });
    axios
      .request({
        method: "GET",
        url: API + "employe/",
        responseType: "json",
        headers: headers,
      })
      .then((response) => {
        dispatch({
          type: itConstants.GETALL_SUCCESS,
          payload: response.data,
        });
      })
      .catch((error) => {
        if (error.response && error.response.data) {
          dispatch({
            type: itConstants.GETALL_FAILURE,
            payload: error.response.data.errors,
          });
        } else {
          Swal.fire({
            title: "Error",
            text: "Connection Problem",
            icon: "error",
            showConfirmButton: false,
            timer: 1000,
          });
        }
      });
  };
}
const actions = {
  addAccount,
  deleteAccount,
  getUsers,
};

export default actions;
