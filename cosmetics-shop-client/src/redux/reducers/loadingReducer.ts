// Define the action interface for setting loading state
interface SetLoadingAction {
  type: "SET_LOADING";
  payload: boolean;
}

// Union type for actions (you can extend this for more actions in the future)
type Action = SetLoadingAction;

interface LoadingState {
  category_loading: boolean;
}

const initialState: LoadingState = {
  category_loading: false,
};

const loadingReducer = (state = initialState, action: Action): LoadingState => {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, category_loading: action.payload };
    default:
      return state;
  }
};

export default loadingReducer;
