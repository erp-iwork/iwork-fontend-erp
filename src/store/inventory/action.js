import Swal from "sweetalert2"
import axios from "axios"
import API from "../../api/API"
import status from '../../constant/status'
import routes from '../../api/routes'
import { inventoryConstant, errorsConstant, companyConstant } from "../../constant/constants"
import headers from "./../headers"
import { Alert } from '../../App'

// ADD ITEM
export const addItem = (item) => (dispatch) => {
  dispatch({
    type: inventoryConstant.REQUEST_ITEM,
    payload: true,
  });
  axios
    .request({
      method: "POST",
      url: API + "item/",
      responseType: "json",
      headers: headers,
      data: item,
    }).then((res) => {
      Swal.fire({
        title: "Item Created",
        icon: "success",
        showConfirmButton: false,
        timer: 1000
      });
      dispatch({
        type: inventoryConstant.ADD_ITEM,
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
        });
      }
    });
};

// GET ITEM
export const getItems = () => (dispatch) => {
  axios
    .get(API + "item/", headers)
    .then((res) => {
      dispatch({
        type: inventoryConstant.GET_ITEMS,
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

export const updateItemQuantity = (itemId, quantity) => (dispatch) => {
  axios
    .request({
      method: "PUT",
      url: API + `item/${itemId}/`,
      responseType: "json",
      headers: headers,
      data: {
        quantity: quantity
      },
    }).then((res) => {
      dispatch({
        type: inventoryConstant.UPDATE_ITEM,
        payload: res.data,
      });
      Swal.fire({
        title: "Item Created",
        icon: "success",
        showConfirmButton: false,
        timer: 1000
      });
    })
    .catch((err) => {
      console.log(err.response);


      if (err.response && err.response.data) {
        dispatch({
          type: errorsConstant.GET_ERRORS,
          payload: err.response.data,
        });
      } else if (err.response) {
        if (err.response.status === 404) {
          Swal.fire({
            title: "Error",
            text: "Please Select an item to be updated.",
            icon: "error",
            showConfirmButton: false,
            timer: 1000
          });
        }
      }
      else {
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
// DELETE ITEM
export const deleteItem = (InventoryItemId) => (dispatch) => {
  Swal.fire({
    title: "Are you sure?",
    text: "You can not revert this Action!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes,",
    cancelButtonText: "no",
  }).then((result) => {
    if (result.value) {
      axios
        .delete(API + `item/${InventoryItemId}/`, headers)
        .then((res) => {
          Swal.fire({
            title: "Success",
            icon: "success",
            showConfirmButton: false,
            timer: 1000
          });
          dispatch({
            type: inventoryConstant.DELETE_ITEM,
            payload: InventoryItemId,
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
              showConfirmButton: false,
              timer: 1000
            });
          }
        });
    }
  });
};

export const getExistingCategories = () => (dispatch) => {
  dispatch({ type: inventoryConstant.REQUEST_GET_EXISTING_CATEGORIES })
  return axios.get(API + routes.category, headers)
    .then(res => {
      dispatch({
        type: inventoryConstant.SUCCESS_GET_EXISTING_CATEGORIES,
        payload: res.data
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
          title: "Error",
          text: "Connection Problem",
          icon: "error",
          showConfirmButton: false,
          timer: 1000
        });
      }
    })
}

export const getItemsByCategory = (categoryID) => (dispatch) => {
  dispatch({ type: inventoryConstant.REQUEST_GET_CATEGORIES })
  return axios.get(API + routes.itemByCategory + categoryID + "/")
    .then(res => {
      dispatch({
        type: inventoryConstant.SUCCESS_GET_CATEGORIES,
        payload: res.data
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
          title: "Error",
          text: "Connection Problem",
          icon: "error",
          showConfirmButton: false,
          timer: 1000
        });
      }
    })
}
export const addCategory = (catagory) => (dispatch) => {
  var data = {
    catagory: catagory
  }
  dispatch({ type: companyConstant.REQUEST_POST_CATEGORY })
  return axios.post(API + routes.category, data, headers)
    .then(res => {
      dispatch({ type: companyConstant.SUCCESS_POST_CATEGORY, payload: res.data })
    })
    .catch((err) => {
      try {
        dispatch({
          type: companyConstant.FAILED_POST_CATEGORY,
          payload: err.response.data,
        });
      } catch {
        console.log("error");
      }
    })
}

export const getInvoicedItems = () => (dispatch) => {
  dispatch({ type: inventoryConstant.REQUEST_GET_PURCHASED_ITEMS })
  return axios.get(API + routes.purchase +
    `?search1=${status.received}&search2=${status.invoiced}`
    , headers)
    .then(res => dispatch({ type: inventoryConstant.SUCCESS_GET_PURCHASED_ITEMS, payload: res.data }))
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
          showConfirmButton: false,
          timer: 1000
        });
      }
    })
}

export const updateStatus = (purchaseOrderNumber) => (dispatch) => {
  dispatch({ type: inventoryConstant.REQUEST_PUT_UPDATE_STATUS })
  return axios.put(API + routes.updatePurchaseStatus + purchaseOrderNumber + '/', {
    status: status.received
  }, headers)
    .then(res => dispatch({ type: inventoryConstant.SUCCESS_PUT_UPDATE_STATUS }))
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
          showConfirmButton: false,
          timer: 1000
        });
      }
    })
}

export const getGRV = (purchaseOrderNumber) => (dispatch) => {
  dispatch({ type: inventoryConstant.REQUEST_GET_GRV })
  return axios.get(API + routes.purchase + purchaseOrderNumber + '/')
    .then(({ data }) => {
      const items = data.purchase_item_order.map(item => {
        return {
          itemID: item.masterData.productId,
          itemName: item.masterData.productName,
          quantity: item.purchaseQuantity,
          price: item.masterData.productPrice
        }
      })
      const payload = {
        order: data.purchaseOrderNumber,
        date: data.purchaseOrderDate,
        GRVID: data.purchaseOrderNumber,
        GRVStatus: data.status_purchase_order[0]['status'],
        GRVItems: items
      }
      dispatch({ type: inventoryConstant.SUCCESS_GET_GRV, payload })
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
          showConfirmButton: false,
          timer: 1000
        });
      }
    })
}

export const getRecords = () => (dispatch) => {
  dispatch({ type: inventoryConstant.REQUEST_GET_RECORDS })
  return axios.get(API + routes.records, headers)
    .then(res => dispatch({ type: inventoryConstant.SUCCESS_GET_RECORDS, payload: res.data }))
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
          showConfirmButton: false,
          timer: 1000
        });
      }
    })
}

export const getRecordsByType = (type) => (dispatch) => {
  dispatch({ type: inventoryConstant.REQUEST_GET_RECORDS })
  return axios.get(API + routes.recordsByType +
    `?transactionType=${type}`, headers)
    .then(res => dispatch({ type: inventoryConstant.SUCCESS_GET_RECORDS, payload: res.data }))
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
          showConfirmButton: false,
          timer: 1000
        });
      }
    })
}

export const checkToast = () => {
  Alert.success("Hello There")
}