import { AppState } from "./app.state";

export const initialState: AppState = {
  user: null
};

export const userReducer = (state = initialState, action: any): AppState => {
  switch (action.type) {
    case "[User] Set User":
      return { ...state, user: action.user };
    case "[User] Clear User":
      return { ...state, user: null};
    default:
      return state;
  }
}