import { SHOW_DIALOG, HIDE_DIALOG } from "../../actions/types";

const initialState = {
  showMessage: false
};

const homeReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_DIALOG: {
      return {
        ...state,
        showMessage: true
      };
    }
    case HIDE_DIALOG: {
      return {
        ...state,
        showMessage: false
      };
    }

    default: {
      return state;
    }
  }
};

export default homeReducer;
