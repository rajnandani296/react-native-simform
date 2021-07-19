import {
  FETCH_CHEMICAL_RECORD_ERROR,
  FETCH_CHEMICAL_RECORD_REQUEST,
  FETCH_CHEMICAL_RECORD_SUCCESS,
} from "../action/ActionType";

const initialState = {
  data: [],
  loading: false,
  error: "",
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CHEMICAL_RECORD_REQUEST:
      console.log("FETCH_CHEMICAL_RECORD_REQUEST");
      return {
        ...state,
        loading: true,
        error: "",
      };

    case FETCH_CHEMICAL_RECORD_SUCCESS:
      console.log("FETCH_CHEMICAL_RECORD_SUCCESS");
      return {
        ...state,
        loading: false,
        data: action.data,
      };

    case FETCH_CHEMICAL_RECORD_ERROR:
      console.log("FETCH_CHEMICAL_RECORD_SUCCESS");
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    default: {
      return state;
    }
  }
};
