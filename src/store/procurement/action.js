import {
  errorsConstant,
  purchaseConstants
} from '../../constant/constants'
import Axios from 'axios'
import Swal from 'sweetalert2'
import API from '../../api/API'
import routes from '../../api/routes'
import headers from '../headers'
import status from '../../constant/status'

const { GET, POST, PUT } = purchaseConstants

export const getOrders = () => (dispatch) => {
  dispatch({ type: GET.REQUEST_GET_ORDER })
  return Axios.get(API + routes.purchase, headers)
    .then(res => {
      dispatch({
        type: GET.SUCCESS_GET_ORDER,
        payload: res.data
      })
    })
    .catch(err => {
      if (err.response && err.response.data) {
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

export const getCustomOrders = (status1, status2) => (dispatch) => {
  dispatch({ type: GET.REQUEST_GET_ORDER })
  return Axios.get(API + routes.purchase +
    `?search1=${status1}&search2=${status2}`, headers)
    .then(res => {
      dispatch({
        type: GET.SUCCESS_GET_ORDER,
        payload: res.data
      })
    })
    .catch(err => {
      if (err.response && err.response.data) {
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

export const getCreatedOrders = () => (dispatch) => {
  dispatch({ type: GET.REQUEST_GET_ORDER })
  return Axios.get(API + routes.purchase +
    `?search1=${status.created}`, headers)
    .then(res => {
      dispatch({
        type: GET.SUCCESS_GET_ORDER,
        payload: res.data
      })
    })
    .catch(err => {
      if (err.response && err.response.data) {
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

export const getDeliveredOrders = () => (dispatch) => {
  dispatch({ type: GET.REQUEST_GET_ORDER })
  return Axios.get(API + routes.purchase +
    `?search1=${status.approved}&search2=${status.delivered}`, headers)
    .then(res => {
      console.log(res.data)
      dispatch({
        type: GET.SUCCESS_GET_ORDER,
        payload: res.data
      })
    })
    .catch(err => {
      if (err.response && err.response.data) {
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

export const getPurchasedOrders = () => (dispatch) => {
  dispatch({ type: GET.REQUEST_GET_ORDER })
  return Axios.get(API + routes.purchase +
    `?search1=${status.approved}&search2=${status.created}`, headers)
    .then(res => {
      dispatch({
        type: GET.SUCCESS_GET_ORDER,
        payload: res.data
      })
    })
    .catch(err => {
      if (err.response && err.response.data) {
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

export const getSuppliers = () => (dispatch) => {
  dispatch({ type: GET.REQUEST_GET_SUPPLIERS })
  return Axios.get(API + routes.supplier, headers)
    .then(res => {
      dispatch({
        type: GET.SUCCESS_GET_SUPPLIERS,
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

export const getMasterdata = () => (dispatch) => {
  dispatch({ type: GET.REQUEST_GET_MASTERDATA })
  return Axios.get(API + routes.itemsToBePurchased)
    .then(res => {
      dispatch({
        type: GET.SUCCESS_GET_MASTERDATA,
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

export const addPurchaseOrder = (order) => (dispatch) => {
  dispatch({ type: POST.REQUEST_POST_PURCHASE })
  return Axios.post(API + routes.purchase, order, headers)
    .then(res => {
      dispatch({
        type: POST.SUCCESS_POST_PURCHASE,
        payload: res.data
      })
      Swal.fire({
        title: "Added Order",
        icon: "success",
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

export const getSingleOrder = (orderID) => (dispatch) => {
  dispatch({ type: GET.REQUEST_GET_SINGLE_ORDER })
  return Axios.get(API + routes.purchase + orderID + "/")
    .then(res => {
      dispatch({
        type: GET.SUCCESS_GET_SINGLE_ORDER,
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

export const updateStatus = (orderNumber, status, message = 'Delivered to Inventory') => (dispatch) => {
  Axios
    .put(API + `${routes.updatePurchaseStatus}${orderNumber}/`, status, headers)
    .then((res) => {
      dispatch({
        type: PUT.SUCCESS_POST_UPDATE_STATUS,
        payload: { order: orderNumber, status: res.data.status },
      });
      Swal.fire({
        title: message,
        icon: "success",
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
          showConfirmButton: false,
          timer: 1000
        });
      }
    });
};

export const invoiceOrder = (purchaseOrderNumber, data) => (dispatch) => {
  dispatch({ type: PUT.REQUEST_PUT_INVOICE })
  return Axios.put(API + routes.purchase + purchaseOrderNumber + '/', data)
    .then(async res => {
      dispatch({ type: PUT.SUCCESS_PUT_INVOICE })
      await Axios.put(API + `${routes.updatePurchaseStatus}${purchaseOrderNumber}/`, {
        status: status.invoiced
      }, headers)
      Swal.fire({
        title: "Invoice Success",
        icon: "success",
        showConfirmButton: false,
        timer: 1000
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
          icon: "error",
          showConfirmButton: false,
          timer: 1000
        });
      }
    })
}