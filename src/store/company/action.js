import Swal from "sweetalert2";
import axios from "axios";
import API from "../../api/API";
import routes from '../../api/routes'
import { companyConstant, errorsConstant } from "../../constant/constants";
import headers from './../headers'
import statusTypes from '../../constant/status'

// ADD COMPANY
export const addCompany = (company) => (dispatch) => {
  dispatch({ type: companyConstant.REQUEST_GET_COMANY })
  return axios
    .post(API + "customer/", company, headers)
    .then((res) => {
      dispatch({
        type: companyConstant.ADD_COMPANY,
        payload: res.data
      })
    })
    .catch((err) => {
      try {
        dispatch({
          type: errorsConstant.GET_ERRORS,
          payload: err.response.data,
        });
      } catch {
        console.log("error");
      }
    });
}

export const addSupplier = (supplier) => (dispatch) => {
  dispatch({ type: companyConstant.REQUEST_POST_ADD_SUPPLIER })
  return axios.post(API + routes.supplier, supplier, headers)
    .then(res => {
      dispatch({ type: companyConstant.SUCCESS_POST_ADD_SUPPLIER, payload: res.data })
    })
    .catch((err) => {
      console.log(err)
      try {
        dispatch({
          type: errorsConstant.GET_ERRORS,
          payload: err.response.data,
        });
      } catch {
        console.log("error");
      }
    })
}




export const getSupplier = (noLoading = false) => (dispatch) => {
  if (!noLoading) {
    dispatch({
      type: companyConstant.REQUEST_GET_SUPPLIER,
      payload: true
    })
  }

  axios.get(API + routes.supplier, headers)
    .then(res => {
      dispatch({
        type: companyConstant.GET_SUPPLIER,
        payload: res.data
      })
    })
    .catch(err => {
      if (err.response && err.response.data) {
        dispatch({
          type: errorsConstant.GET_ERRORS,
          payload: err.response.data
        })
      } else {
        Swal.fire({
          title: "Error", text: "Connection Problem",
          icon: "error",
          showConfirmButton: false,
          timer: 1000
        })
      }
    })
}

export const deleteSupplier = (supplierID) => (dispatch) => {
  return Swal.fire({
    title: "Are you sure?",
    text: "Are you not revert this action!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes,",
    cancelButtonText: "no",
  }).then(res => {
    if (res.value) {
      axios
        .delete(API + `${routes.supplier}${supplierID}/`, headers)
        .then((res) => {
          Swal.fire({
            title: "Deleted",
            icon: "success",
            showConfirmButton: false,
            timer: 1000
          }).then(res => {
            dispatch({
              type: companyConstant.DELETE_SUPPLIER,
              payload: supplierID,
            });
          })
        })
        .catch((err) => {
          if (err.response && err.response.data) {
            dispatch({
              type: errorsConstant.GET_ERRORS,
              payload: err.response.data,
            });
          } else {
            Swal.fire({
              title: "Error", text: "Connection Problem",
              icon: "error",
              showConfirmButton: false,
              timer: 1000
            });
          }
        })
      return res.value
    }
  })
}

// GET COMPANYS
export const getCompany = () => (dispatch) => {
  axios
    .get(API + "customer/", headers)
    .then((res) => {
      dispatch({
        type: companyConstant.GET_COMPANYS,
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
          title: "Error", text: "Connection Problem",
          icon: "error",
          showConfirmButton: false,
          timer: 1000
        });
      }
    });
};

// DELETE COMPANY
export const deleteCompany = (companyId) => (dispatch) => {
  return Swal.fire({
    title: "Are you sure?",
    text: "Are you not revert this action!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes,",
    cancelButtonText: "no",
  }).then((result) => {
    if (result.value) {
      axios
        .delete(API + `customer/${companyId}/`, headers)
        .then((res) => {
          Swal.fire({
            title: "Deleted",
            icon: "success",
            showConfirmButton: false,
            timer: 1000
          }).then(res => {
            dispatch({
              type: companyConstant.DELETE_COMPANY,
              payload: companyId,
            });
          })
        })
        .catch((err) => {
          if (err.response && err.response.data) {
            dispatch({
              type: errorsConstant.GET_ERRORS,
              payload: err.response.data,
            });
          } else {
            Swal.fire({
              title: "Error", text: "Connection Problem",
              icon: "error",
              showConfirmButton: false,
              timer: 1000
            });
          }
        });
    }
    return result.value
  });
};

export const addMasterData = (masterData) => (dispatch) => {
  dispatch({
    type: companyConstant.REQUEST_ADD_MASTERDATA,
    payload: true
  })
  return axios
    .post(API + routes.masterData, masterData, headers)
    .then((res) => {

      Swal.fire({
        title: "Added Product",
        icon: "success",
        showConfirmButton: false,
        timer: 1000
      })
      dispatch({
        type: companyConstant.ADD_MASTERDATA,
        payload: res.data
      })
    })
    .catch((err) => {
      console.log(err.response.data);

      dispatch({
        type: errorsConstant.GET_ERRORS,
        payload: err.response.data.errors,
      });

    });
}

export const getAllMasterData = () => (dispatch) => {
  dispatch({
    type: companyConstant.REQUEST_GET_MASTERDATA,
    payload: true
  })
  return axios.get(API + routes.masterData, headers)
    .then(res => {
      dispatch({
        type: companyConstant.GET_MASTERDATA,
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
          title: "Error", text: "Connection Problem",
          icon: "error",
          showConfirmButton: false,
          timer: 1000
        })
      }
    })
}

export const getMasterData = () => (dispatch) => {
  dispatch({
    type: companyConstant.REQUEST_GET_MASTERDATA,
    payload: true
  })
  return axios.get(API + routes.rawmaterial, headers)
    .then(res => {
      dispatch({
        type: companyConstant.GET_MASTERDATA,
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
          title: "Error", text: "Connection Problem",
          icon: "error",
          showConfirmButton: false,
          timer: 1000
        })
      }
    })
}


export const updateStatus = (orderNumber, status) => (dispatch) => {
  dispatch({ type: companyConstant.REQUEST_UPDATE_STATUS })
  return axios.put(API + `${routes.updatePurchaseStatus}${orderNumber}/`, status, headers)
    .then((res) => {
      dispatch({ type: companyConstant.SUCCESS_UPDATE_STATUS })
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

export const getManufacturedOrders = (status1, status2 = statusTypes.finished) => (dispatch) => {
  dispatch({ type: companyConstant.REQUEST_GET_MANUFACTURED_ORDERS })
  return axios.get(API + routes.manufacturing +
    `?search1=${status1}&search2=${status2}`, headers)
    .then(res => dispatch({ type: companyConstant.SUCCESS_GET_MANUFACTURED_ORDERS, payload: res.data }))
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