import {
  GET_ORDER,
  GET_STATUS,
  UPDATE_STATUS,
  GET_SINGLE_ORDER,
  REQUEST_ORDERS,
  REQUEST_SINGLE_ORDER,
  orderConstants,
  errorsConstant,
} from "../../constant/constants";
import axios from "axios";
import Swal from "sweetalert2";
import API from "../../api/API";
import headers from './../headers'
import routes from '../../api/routes'
import status from '../../constant/status'

// GET ORDER
export const getOrders = () => (dispatch) => {
  dispatch({
    type: REQUEST_ORDERS,
    payload: true
  })
  axios
    .get(API + "orderstatus/", headers)
    .then((res) => {
      dispatch({
        type: GET_ORDER,
        payload: res.data,
      });
    })
    .catch((err) => {
      if (err.response && err.response.data) {
        dispatch({
          type: errorsConstant.GET_ERRORS,
          payload: err.response.data,
        });
      } else {
        Swal.fire({
          title: "Error",
          text: "Connection Problem",
          icon: "error",
          position: 'top-right',
          showConfirmButton: false,
          timer: 1000
        });
      }
    });
};

// GET ORDER
export const getSingleOrder = (orderNumber) => (dispatch) => {
  dispatch({
    type: REQUEST_SINGLE_ORDER,
    payload: true
  })
  axios
    .get(API + `order/${orderNumber}/`, headers)
    .then((res) => {
      dispatch({
        type: GET_SINGLE_ORDER,
        payload: res.data,
      });
    })
    .catch((err) => {
      if (err.response && err.response.data) {
        dispatch({
          type: errorsConstant.GET_ERRORS,
          payload: err.response.data,
        });
      } else {
        Swal.fire({
          title: "Error",
          text: "Connection Problem",
          icon: "error",
          position: 'top-right',
          showConfirmButton: false,
          timer: 1000
        });
      }
    });
};

// Get ALL STATUS
export const getStatus = () => (dispatch) => {
  axios
    .get(API + "status/")
    .then((res) => {
      dispatch({
        type: GET_STATUS,
        payload: res.data,
      });
    })
    .catch((err) => {
      if (err.response && err.response.data) {
        dispatch({
          type: errorsConstant.GET_ERRORS,
          payload: err.response.data,
        });
      } else {
        Swal.fire({
          title: "Error",
          text: "Connection Problem",
          icon: "error",
          position: 'top-right',
          showConfirmButton: false,
          timer: 1000
        });
      }
    });
};

// UPDATE STATUS
export const updateStatus = (orderNumber, status) => (dispatch) => {
  axios
    .put(API + `status/${orderNumber}/`, status, headers)
    .then((res) => {
      dispatch({
        type: UPDATE_STATUS,
        payload: { order: orderNumber, status: res.data.status },
      });
      Swal.fire({
        title: "Delivered",
        icon: "success",
        position: 'top-right',
        showConfirmButton: false,
        timer: 1000
      });
    })
    .catch((err) => {
      if (err.response && err.response.data) {
        dispatch({
          type: errorsConstant.GET_ERRORS,
          payload: err.response.data,
        });
      } else {
        console.log(err)
        Swal.fire({
          title: "Error",
          text: "Connection Problem",
          icon: "error",
          position: 'top-right',
          showConfirmButton: false,
          timer: 1000
        });
      }
    });
};

export const getDeliveredOrders = () => (dispatch) => {
  const { GET } = orderConstants
  dispatch({ type: GET.REQUEST_GET_DELIVERED_ORDERS })
  return axios.get(API + routes.purchase +
    `?search1=${status.delivered}&search2=${status.invoiced}`)
    .then(res => {
      dispatch({ type: GET.SUCCESS_GET_DELIVERED_ORDERS, payload: res.data })
    })
    .catch((err) => {
      if (err.response && err.response.data) {
        dispatch({
          type: errorsConstant.GET_ERRORS,
          payload: err.response.data,
        })
      } else {
        console.log(err)
        Swal.fire({
          title: "Error",
          text: "Connection Problem",
          icon: "error",
          position: 'top-right',
          showConfirmButton: false,
          timer: 1000
        })
      }
    })
}