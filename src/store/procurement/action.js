import {
    errorsConstant,
    purchaseConstants
} from '../../constant/constants'
import Axios from 'axios'
import Swal from 'sweetalert2'
import API from '../../api/API'
import routes from '../../api/routes'
import headers from '../headers'
const { GET, POST } = purchaseConstants

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

export const addPurchaseOrder = (order) => {
    dispatch({ type: POST.REQUEST_POST_PURCHASE })
    return Axios.post(API + routes.purchase)
        .then(res => {
            dispatch({
                type: POST.SUCCESS_POST_PURCHASE,
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