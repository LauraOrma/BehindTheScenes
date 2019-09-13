import {TAction} from "../_actions/actionTypes";
import {ICasting} from "../_interfaces/interfaceICasting";

const initialUser: ICasting[] = [];

export const castingReducer = (
    state: ICasting[] = initialUser,
    action: TAction
): ICasting[] => {
    if (action.type === "SET_CASTING") {
        return action.casting;
    }

    return state;
};