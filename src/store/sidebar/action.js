import { sidebar } from "../../constant/constants";


export default function sideBarOpenController(dep){
    return (dispatch) => {
    dispatch({
        type: sidebar.SIDEBAR_CONTROL,
        payload:dep

      });
    }
  
}