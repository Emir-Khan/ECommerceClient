
// create selector for user state

import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AppState } from "./app.state";

export const selectAppState = createFeatureSelector<AppState>("user");

export const selectUser = createSelector(selectAppState, (state: AppState) => state.user);