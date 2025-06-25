import { Category } from "../types"; // Assuming you have a Category type defined

// Define the action interface for setting categories
interface SetCategoriesAction {
  type: "SET_CATEGORIES";
  payload: Category[];
}

// Union type for actions (you can extend this as needed)
type Action = SetCategoriesAction;

interface InitState {
  categories: Category[];
}

const initialState: InitState = {
  categories: [],
};

const initReducer = (state = initialState, action: Action): InitState => {
  switch (action.type) {
    case "SET_CATEGORIES":
      return { ...state, categories: action.payload };
    default:
      return state;
  }
};

export default initReducer;
