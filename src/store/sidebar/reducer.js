// import { sidebar } from "../../constant/constants";

const initialState = {
    isOpenHR: false,
    isOpenIT: false,
    isOpenSALES: false,
    isOpenFINANCE: false,
    isOpenINVENTORY: false,
    isOpenLOGISTICS: false,
    isOpenPROCURMENT: false,
    isOpenMANUFACTURING: false,


};
export default function sidebarControllerReducer(state = initialState, action) {
    switch (action.payload) {
        // All employe api pre-request
        case "HR": {
            return {
                ...state,
                isOpenHR: !state.isOpenHR,
                isOpenFINANCE: false,
                isOpenIT: false,
                isOpenSALES: false,
                isOpenINVENTORY: false,
                isOpenLOGISTICS: false,
                isOpenPROCURMENT: false,
                isOpenMANUFACTURING: false,

            };
        }
        case "FINANCE": {
            return {
                ...state,
                isOpenFINANCE: !state.isOpenFINANCE,
                isOpenHR: false,
                isOpenIT: false,
                isOpenSALES: false,
                isOpenINVENTORY: false,
                isOpenLOGISTICS: false,
                isOpenPROCURMENT: false,
                isOpenMANUFACTURING: false,
            };
        }
        case "IT": {
            return {
                ...state,
                isOpenIT: !state.isOpenIT,
                isOpenHR: false,
                isOpenSALES: false,
                isOpenFINANCE: false,
                isOpenINVENTORY: false,
                isOpenLOGISTICS: false,
                isOpenPROCURMENT: false,
                isOpenMANUFACTURING: false,
            };
        }
        case "SALES": {
            return {
                ...state,
                isOpenSALES: !state.isOpenSALES,
                isOpenHR: false,
                isOpenIT: false,
                isOpenFINANCE: false,
                isOpenINVENTORY: false,
                isOpenLOGISTICS: false,
                isOpenPROCURMENT: false,
                isOpenMANUFACTURING: false,
            };
        }
        case "INVENTORY": {
            return {
                ...state,
                isOpenINVENTORY: !state.isOpenINVENTORY,
                isOpenHR: false,
                isOpenIT: false,
                isOpenFINANCE: false,
                isOpenSALES: false,
                isOpenLOGISTICS: false,
                isOpenPROCURMENT: false,
                isOpenMANUFACTURING: false,
            };
        }
        case "LOGISTICS": {
            return {
                ...state,
                isOpenLOGISTICS: !state.isOpenLOGISTICS,
                isOpenHR: false,
                isOpenIT: false,
                isOpenFINANCE: false,
                isOpenSALES: false,
                isOpenINVENTORY: false,
                isOpenPROCURMENT: false,
                isOpenMANUFACTURING: false,
            };
        }
        //////

        case "PROCURMENT": {
            return {
                ...state,
                isOpenPROCURMENT: !state.isOpenPROCURMENT,
                isOpenHR: false,
                isOpenIT: false,
                isOpenFINANCE: false,
                isOpenSALES: false,
                isOpenLOGISTICS: false,
                isOpenINVENTORY: false,
                isOpenMANUFACTURING: false,
            };
        }
        case "MANUFACTURING": {
            return {
                ...state,
                isOpenMANUFACTURING: !state.isOpenMANUFACTURING,
                isOpenHR: false,
                isOpenIT: false,
                isOpenFINANCE: false,
                isOpenSALES: false,
                isOpenLOGISTICS: false,
                isOpenPROCURMENT: false,
                isOpenINVENTORY: false,
            };
        }
        default:
            return {
                ...state
            }

    }
}