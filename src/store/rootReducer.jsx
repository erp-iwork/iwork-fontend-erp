import { combineReducers } from "redux";
import loginReducer from "./login/reducer";
import hrReducer from "./hr/reducer";
import inventoryReducer from "./inventory/reducer";
import companyReducer from "./company/reducer";
import invoiceReducer from "./Invoice/reducer";
import sivReducer from "./Siv/reducer";
import salesReducer from "./sales/reducer";
import ordersReducer from "./order/reducer";
import procurementReducer from "./procurement/reducer";
import manuFacturingReducer from "./manufacturing/reducer";
import itReducer from "./it/reducer";
import sidebarControllerReducer from './sidebar/reducer'

export default combineReducers({
  loginReducer,
  hrReducer,
  inventoryReducer,
  companyReducer,
  invoiceReducer,
  sivReducer,
  salesReducer,
  ordersReducer,
  procurementReducer,
  manuFacturingReducer,
  itReducer,
  sidebarControllerReducer
});
