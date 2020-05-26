import {
  errorsConstant,
  manuFacturingConstant
} from '../../constant/constants'
import Axios from 'axios'
import Swal from 'sweetalert2'
import API from '../../api/API'
import routes from '../../api/routes'
import headers from '../headers'

export const getMasterdata = () => (dispatch) => {
  dispatch({ type: manuFacturingConstant.REQUEST_GET_MASTERDATA })
  return Axios.get(API + routes.masterData, headers)
    .then(res => {
      dispatch({
        type: manuFacturingConstant.SUCCESS_GET_MASTERDATA,
        payload: res.data
      })
    })
    .catch(err => {
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
          showConfirmButton: false,
          timer: 1000
        })
      }
    })
}

export const addManufacturingOrder = (data) => (dispatch) => {
  console.log(data);

  dispatch({ type: manuFacturingConstant.REQUEST_POST_MANUFATURE })
  return Axios.post(API + routes.manufacturing, data, headers)
    .then(res => {

      dispatch({ type: manuFacturingConstant.SUCCESS_POST_MANUFATURE, payload: res.data })
      Swal.fire({
        title: 'Added Manufacture Order',
        icon: 'success',
        showConfirmButton: false,
        timer: 1000
      })
    })
    .catch(err => {
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
          showConfirmButton: false,
          timer: 1000
        })
      }
    })
}

export const getOrders = () => (dispatch) => {
  dispatch({ type: manuFacturingConstant.REQUEST_GET_ORDERS })
  return Axios.get(API + routes.manufacturing, headers)
    .then(res => {
      dispatch({ type: manuFacturingConstant.SUCCESS_GET_ORDERS, payload: res.data })
    })
    .catch(err => {
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
          showConfirmButton: false,
          timer: 1000
        })
      }
    })
}

