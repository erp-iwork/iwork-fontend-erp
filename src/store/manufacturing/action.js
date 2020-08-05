import {
  errorsConstant,
  manuFacturingConstant
} from '../../constant/constants'
import Axios from 'axios'
import Swal from 'sweetalert2'
import API from '../../api/API'
import routes from '../../api/routes'
import headers from '../headers'
import statusTypes from '../../constant/status'

export const getMasterdata = () => (dispatch) => {
  dispatch({ type: manuFacturingConstant.REQUEST_GET_MASTERDATA })
  return Axios.get(API + routes.itemsToBeManufactured, headers)
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
          position: 'top-right',
          showConfirmButton: false,
          timer: 1000
        })
      }
    })
}


export const addManufacturingOrder = (data) => (dispatch) => {
  dispatch({ type: manuFacturingConstant.REQUEST_POST_MANUFATURE })
  return Axios.post(API + routes.manufacturing, data, headers)
    .then(res => {
      dispatch({ type: manuFacturingConstant.SUCCESS_POST_MANUFATURE, payload: res.data })

    })
    .catch(err => {
      if (err.response && err.response.data) {
        dispatch({
          type: errorsConstant.GET_ERRORS,
          payload: err.response.data.errors,
        });
      } else {
        Swal.fire({
          title: "Error",
          text: "Connection Problem",
          position: 'top-right',
          icon: "error",
          showConfirmButton: false,
          timer: 1000
        })
      }
    })
}

export const getOrders = () => (dispatch) => {
  dispatch({ type: manuFacturingConstant.REQUEST_GET_MANUFACTURED_ORDERS })
  return Axios.get(API + routes.manufacturing, headers)
    .then(res => {
      dispatch({ type: manuFacturingConstant.SUCCESS_GET_MANUFACTURED_ORDERS, payload: res.data })
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
          position: 'top-right',
          icon: "error",
          showConfirmButton: false,
          timer: 1000
        })
      }
    })
}

export const getManufacturedOrders = (status1, status2 = statusTypes.finished) => (dispatch) => {
  dispatch({ type: manuFacturingConstant.REQUEST_GET_MANUFACTURED_ORDERS })
  return Axios.get(API + routes.manufacturing +
    `?search1=${status1}&search2=${status2}`, headers)
    .then(res => dispatch({ type: manuFacturingConstant.SUCCESS_GET_MANUFACTURED_ORDERS, payload: res.data }))
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
          position: 'top-right',
          icon: "error",
          showConfirmButton: false,
          timer: 1000
        });
      }
    })
}

export const updateStatus = (orderNumber, status) => (dispatch) => {
  dispatch({ type: manuFacturingConstant.REQUEST_PUT_ORDERS, payload: true })
  Axios.put(API + `${routes.manufacturestatus}${orderNumber}/`, { status }, headers)
    .then((res) => {
      dispatch({
        type: manuFacturingConstant.SUCCESS_PUT_ORDERS,
        payload: { order: res.data.manufacture_order, status: res.data.status },
      })
    })
    .catch((err) => {
      console.log(err.response)
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
          position: 'top-right',
          icon: "error",
          showConfirmButton: false,
          timer: 1000
        });
      }
    });
};

export const getSingleManufacturedOrder = (orderNumber) => (dispatch) => {
  dispatch({ type: manuFacturingConstant.REQUEST_GET_SINGLE_ORDER })
  return Axios.get(API + routes.manufacturing + orderNumber + '/')
    .then(res => dispatch({ type: manuFacturingConstant.SUCCESS_GET_SINGLE_ORDER, payload: res.data }))
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
          position: 'top-right',
          text: "Connection Problem",
          icon: "error",
          showConfirmButton: false,
          timer: 1000
        });
      }
    });
}

export const invoiceProduct = (orderNumber, status) => (dispatch) => {
  dispatch({ type: manuFacturingConstant.REQUEST_PUT_INVOICE_ORDER })
  return Axios.put(API + routes.manufacturestatus + orderNumber + '/', status, headers)
    .then(res => {
      window.location.reload()
      dispatch({ type: manuFacturingConstant.SUCCESS_PUT_INVOICE_ORDER })
    }
    )
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
          timer: 1000
        });
      }
    })
}

export const updateQuantity = (orderNumber, data) => (dispatch) => {
  dispatch({ type: manuFacturingConstant.REQUEST_POST_UPDATE_COMPONENT_QUANTITY })
  return Axios.put(API + routes.componentQualityUpdate, data)
    .then(async res => {
      dispatch({ type: manuFacturingConstant.REQUEST_PUT_ORDERS, payload: true })
      Axios.put(API + `${routes.manufacturestatus}${orderNumber}/`, { status: "Confirmed" }, headers)
        .then((res) => {
          Swal.fire({
            title: "Quantity Updated",
            position: 'top-right',
            icon: "success",
            showConfirmButton: false,
            timer: 1000
          })

        })
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
          position: 'top-right',
          icon: "error",
          showConfirmButton: false,
          timer: 1000
        });
      }
    })
}