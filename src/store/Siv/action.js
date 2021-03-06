import { GET_SIV, REQUEST_SIV, errorsConstant, UPDATE_SIV } from "../../constant/constants";
import axios from "axios";
import Swal from "sweetalert2";
import API from "../../api/API";
import headers from "./../headers";

// GET SIV TAKES ORDER NUMBER
export const getSiv = (order) => (dispatch) => {
  dispatch({
    type: REQUEST_SIV,
    payload: true
  })
  axios
    .get(API + `generatesiv/${order}`, headers)
    .then((res) => {
      dispatch({
        type: GET_SIV,
        payload: res.data
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
          timer: 1000,
        });
      }
    });
};

// UPDATE siv Status
export const updateSiv = (orderNumber, status) => (dispatch) => {
  axios
    .put(API + `generatesiv/${orderNumber}/`, status, headers)
    .then((res) => {
      dispatch({
        type: UPDATE_SIV,
        payload: { order: orderNumber, status: "Issued" },
      });
      // dispatch({
      //   type: UPDATE_SIV,
      //   payload: { orderNumber: orderNumber, status: "Approved" },
      // });

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
          position: 'top-right',
          text: "Connection Problem",
          icon: "error",
          showConfirmButton: false,
          timer: 1000,
        });
      }
    });
};
