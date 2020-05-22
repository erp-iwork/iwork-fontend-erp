import {
    errorsConstant,
    purchaseConstants
} from '../../constant/constants'
import Axios from 'axios'
import Swal from 'sweetalert2'
import API from '../../api/API'
import routes from '../../api/routes'
import headers from '../headers'
const { GET, POST, PUT } = purchaseConstants

export const getOrders = () => (dispatch) => {
    dispatch({ type: GET.REQUEST_GET_ORDER })
    return Axios.get(API + routes.purchaseStatus, headers)
        .then(res => {
            dispatch({
                type: GET.SUCCESS_GET_ORDER,
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
    return Axios.get(API + routes.masterData)
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
    return Axios.get(API + routes.updatePurchaseStatus + orderID + "/")
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

export const updateStatus = (orderNumber, status) => (dispatch) => {
  Axios
    .put(API + `${routes.updatePurchaseStatus}${orderNumber}/`, status, headers)
    .then((res) => {
      dispatch({
        type: PUT.SUCCESS_POST_UPDATE_STATUS,
        payload: { order: orderNumber, status: res.data.status },
      });
      Swal.fire({
        title: "Delivered to Inventory",
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