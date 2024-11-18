import { createAction, props } from "@ngrx/store";
import { UserDetail } from "src/app/models/user-detail";

export const setUser = createAction("[User] Set User", props<{ user: UserDetail }>());
export const clearUser = createAction("[User] Clear User");