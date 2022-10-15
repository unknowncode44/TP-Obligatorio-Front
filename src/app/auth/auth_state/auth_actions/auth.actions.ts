import { createAction, props } from "@ngrx/store";


export const registerUser = createAction(
  '[User List] Add User',
   props<{username: string}>
)



