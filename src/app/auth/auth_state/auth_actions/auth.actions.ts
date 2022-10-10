import { createAction, props } from "@ngrx/store";
import { User } from "../../models/user.model";

export const registerUser = createAction(
    '[User List] Add User',
    props<{username: string}>
)