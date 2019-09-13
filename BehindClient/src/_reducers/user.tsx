import {TAction} from "../_actions/actionTypes";
import {IUser} from "../_interfaces/interfaceIUser";

const initialUser: IUser[] = [];

export const userReducer = (
    state: IUser[] = initialUser,
    action: TAction
): IUser[] => {
    if (action.type === "SET_USER") {
        return action.user;
    }

    return state;
};