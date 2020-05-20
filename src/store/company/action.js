import Swal from "sweetalert2";
import axios from "axios";
import API from "../../api/API";
import routes from '../../api/routes'
import { companyConstant, errorsConstant } from "../../constant/constants";
import headers from './../headers'

// ADD COMPANY
export const addCompany = (company) => (dispatch) => {
  return axios
    .post(API + "customer/", company, headers)
    .then((res) => {
      Swal.fire({
        title: "Success",
        icon: "success",
        showConfirmButton: false,
        timer: 1000
      })
      dispatch({
        type: companyConstant.ADD_COMPANY,
        payload: res.data,
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
  return axios.post (API + routes.supplier, supplier, headers)
    .then(res => {
      Swal.fire({
        title: 'Success',
        icon: 'success',
        showCancelButton: false,
        timer: 1000
      })
      dispatch({
        type: companyConstant.ADD_SUPPLIER,
        payload: res.data
      })
    })
    .catch(err => {
      try {
        dispatch({
          type: errorsConstant.GET_ERRORS,
          payload: err.response.data
        })
      } catch {
        console.log("Error occured in adding a supplier")
      }
    })
}

export const getSupplier = () => (dispatch) => {
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