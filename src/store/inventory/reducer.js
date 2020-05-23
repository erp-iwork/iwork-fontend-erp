import { inventoryConstant, errorsConstant } from "../../constant/constants";
const initialState = {
  items: [],
  errors: [],
  success: false,
  loading_categories: true,
  loading_items: true,
  categories: [],
};

export default function inventoryReducer(state = initialState, action) {
  switch (action.type) {
    case inventoryConstant.REQUEST_ITEM:
      return {
        ...state,
        success: false,
      };
    case errorsConstant.GET_ERRORS:
      return {
        ...state,
        errors: action.payload,
      };
    case inventoryConstant.GET_ITEMS:
      return {
        ...state,
        items: action.payload,
      };

    case inventoryConstant.ADD_ITEM:
      return {
        ...state,
        success: true,
        items: [...state.items, action.payload],
        loading: false,
        errors: [],

      };
    case inventoryConstant.UPDATE_ITEM: {
      const index = state.items.findIndex(
        (it) => it.InventoryItemId === action.payload.Item
      );
      const itms = state.items[index];
      itms.quantity = action.payload.item_quantity;
      return {
        ...state,
        success: true,
        items: state.items,
        loading: false,
        errors: [],

      };
    }

    case inventoryConstant.DELETE_ITEM:
      return {
        ...state,
        items: state.items.filter(
          (item) => item.InventoryItemId !== action.payload
        ),
        loading: false,
      };
    
    case inventoryConstant.REQUEST_GET_EXISTING_CATEGORIES:
      return {
        ...state, loading_categories: true
      }

    case inventoryConstant.SUCCESS_GET_EXISTING_CATEGORIES:
      return {
        ...state, loading_categories: false, success: true,
        categories: action.payload
      }

    case inventoryConstant.REQUEST_GET_CATEGORIES:
      return {
        ...state, loading_items: true
      }

    case inventoryConstant.SUCCESS_GET_CATEGORIES:
      return {
        ...state, loading_items: false, success: true,
        items: action.payload
      }

    default:
      return state;
  }
}
