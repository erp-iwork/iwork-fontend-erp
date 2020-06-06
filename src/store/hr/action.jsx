import Swal from "sweetalert2";
import axios from "axios";
import API from "../../api/API";
import { appConstants } from "../../constant/constants";
import headers from "./../headers";

function addNewEmployee(data) {
  return (dispatch) => {
    var param = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      hiredDate: data.hiredDate,
      telephone: data.telephone,
      department: data.depValue,
      roles: data.rolValue,
      level: data.levValue,
      termOfEmployment: data.termOfEmployment,
      country: data.country,
      city: data.city,
      region: data.region,
      birthDate: data.birthDate,
      gender: data.gender,
    };

    dispatch({
      type: appConstants.REGISTER_REQUEST,
      payload: true,
    });

    axios
      .request({
        method: "POST",
        url: API + "employe/",
        responseType: "json",
        headers: headers,
        data: param,
      })
      .then((response) => {
        dispatch({
          type: appConstants.REGISTER_SUCCESS,
          payload: response.data,
        });
      })
      .catch((error) => {
        if (error.response && error.response.data) {
          dispatch({
            type: appConstants.REGISTER_FAILURE,
            payload: error.response.data,
          });
        } else {
          Swal.fire({
            title: "Error",
            text: "Connection Problem",
            icon: "error",
            position: 'top-right',

            showConfirmButton: false,
            timer: 1000,
          });
        }
      });
  };
}

function getEmploye() {
  return (dispatch) => {
    dispatch({
      type: appConstants.FETCH_REQUEST,
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
          type: appConstants.FETCH_SUCCESS,
          payload: response.data,
        });
      })
      .catch((error) => {
        if (error.response && error.response.data) {
          dispatch({
            type: appConstants.FETCH_FAILURE,
            payload: error.response.data.errors,
          });
        } else {
          Swal.fire({
            title: "Error",
            text: "Connection Problem",
            position: 'top-right',

            icon: "error",
            showConfirmButton: false,
            timer: 1000,
          });
        }
      });
  };
}

const deleteEmploye = (employeId) => (dispatch) => {
  dispatch({
    type: appConstants.DELETE_REQUEST,
    payload: true,
  });

  return axios
    .request({
      method: "DELETE",
      url: API + "employe/" + employeId,
      responseType: "json",
      headers: headers,
    })
    .then((response) => {
      dispatch({
        type: appConstants.DELETE_SUCCESS,
        payload: employeId,
      });
    })
    .catch((error) => {
      if (error.response && error.response.data) {
        dispatch({
          type: appConstants.DELETE_FAILURE,
          payload: error.response.data,
        });
      } else {
        Swal.fire({
          title: "Error",
          text: "Connection Problem",
          icon: "error",
          position: 'top-right',

          showConfirmButton: false,
          timer: 1000,
        });
      }
    });
};

function getEmployeDetail(employeId) {
  return (dispatch) => {
    dispatch({
      type: appConstants.FETCH_SINGLE_REQUEST,
      payload: true,
    });
    axios
      .request({
        method: "GET",
        url: API + "employe/" + employeId,
        responseType: "json",
        headers: headers,
      })
      .then((response) => {
        dispatch({
          type: appConstants.FETCH_SINGLE_SUCCESS,
          payload: response.data,
        });
      })
      .catch((error) => {
        if (error.response && error.response.data) {
          dispatch({
            type: appConstants.FETCH_SINGLE_FAILURE,
            payload: error.response.data,
          });
        } else {
          Swal.fire({
            title: "Error",
            text: "Connection Problem",
            icon: "error",
            position: 'top-right',

            showConfirmButton: false,
            timer: 1000,
          });
        }
      });
  };
}

function getDepartment() {
  return (dispatch) => {
    dispatch({
      type: appConstants.FETCH_DEPARTMENT_REQUEST,
      payload: true,
    });
    axios
      .request({
        method: "GET",
        url: API + "department/",
        responseType: "json",
        headers: headers,
      })
      .then((response) => {
        dispatch({
          type: appConstants.FETCH_DEPARTMENT_SUCCESS,
          payload: response.data,
        });
      })
      .catch((error) => {
        if (error.response && error.response.data) {
          dispatch({
            type: appConstants.FETCH_DEPARTMENT_FAILURE,
            payload: error.response.data,
          });
        } else {
          Swal.fire({
            title: "Error",
            text: "Connection Problem",
            icon: "error",
            position: 'top-right',

            showConfirmButton: false,
            timer: 1000,
          });
        }
      });
  };
}

const actions = {
  addNewEmployee,
  deleteEmploye,
  getEmploye,
  getEmployeDetail,
  getDepartment,
};

export default actions;
